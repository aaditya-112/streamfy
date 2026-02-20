import { useState } from "react";
import useAuthUser from "../hooks/useAuthUser";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { completeOnboarding } from "../lib/api";
import { CameraIcon, ShuffleIcon } from "lucide-react";
import { LANGUAGES } from "../constants";

const OnbordingPage = () => {
  const { authUser } = useAuthUser();
  const queryClient = useQueryClient();

  const [formState, setFormState] = useState({
    fullName: authUser?.fullName || "",
    bio: authUser?.bio || "",
    nativeLanguage: authUser?.nativeLanguage || "",
    learningLanguage: authUser?.location || "",
    location: authUser?.location || "",
    profilePic: authUser?.profilePic || "",
  });

  const { mutate: onboardingMutation, isPending } = useMutation({
    mutationFn: completeOnboarding,
    onSuccess: () => {
      toast.success("Profile onboarding successfully");
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    onboardingMutation(formState);
  };

  const handleRandomAvatar = () => {
    return;
  };
  return (
    <div className="min-h-screen bg-base-100 flex items-center justify-center p-4">
      <div className="card bg-base-200 w-full max-w-3xl shadow-xl">
        <div className="card-body p-6 sm:p-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6">
            Complete Your profile
          </h1>
          <form onSubmit={handleSubmit} className="spaace-y-6">
            {/* profile pic container */}
            <div className="flex flex-col items-center justify-center space-y-4">
              {/* image preview */}
              <div className="size-32 rounded-full bg-neutral-content overflow-hidden">
                {formState.profilePic ? (
                  <img
                    src={formState.profilePic}
                    alt="profile preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <CameraIcon className="size-12 text-base-content opacity-40" />
                  </div>
                )}
              </div>

              {/* generate random avataar btn */}
              <div className="flex items-center gap-2">
                <button
                  className="btn btn-accent"
                  type="button"
                  onClick={handleRandomAvatar}
                >
                  <ShuffleIcon className="size-4 mr-2" /> Generate Random Avatar
                </button>
              </div>
            </div>

            {/* full name */}
            <div className="form-control">
                <label className="label">
                  <span className="label-text">Full Name</span>
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formState.fullName}
                  onChange={(e) =>
                    setFormState({ ...formState, fullName: e.target.value })
                  }
                  className="input input-bordered w-full"
                  placeholder="Your full name"
                />
            </div>

            {/* bio */}
            <div className="form-control">
                <label className="label">
                  <span className="label-text">Bio</span>
                </label>
                <input
                  type="text"
                  name="bio"
                  value={formState.bio}
                  onChange={(e) =>
                    setFormState({ ...formState, bio: e.target.value })
                  }
                  className="textarea textarea-boadered h-24 w-full" 
                  placeholder="Tell others about yourself and language learning goals"
                />
            </div>
            
            {/* language */}
            <div className="grid grid-cols-1 md:grid-col-2 gap-4">
              {/* native language */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Native Language</span>
                </label>
                <select name="nativeLanguage" value={formState.nativeLanguage} onChange={(e)=>setFormState({...formState, nativeLanguage: e.target.value})} className="select select-bordered w-full">
                  <option value="">Select your native language</option>
                  {LANGUAGES.map((lang)=>(
                    <option key={`native-${lang}`} value={lang.toLowerCase()}>{lang}</option>
                  ))}
                </select>
              </div>

              {/* learning language */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Learning Language</span>
                </label>
                <select name="nativeLanguage" value={formState.learningLanguage} onChange={(e)=>setFormState({...formState, learningLanguage: e.target.value})} className="select select-bordered w-full">
                  <option value="">Select language you're learning</option>
                  {LANGUAGES.map((lang)=>(
                    <option key={`native-${lang}`} value={lang.toLowerCase()}>{lang}</option>
                  ))}
                </select>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OnbordingPage;
