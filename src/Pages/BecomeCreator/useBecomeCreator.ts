import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserInfo } from "../../context/UserInfoContext";
import useAuth from "../../hooks/useAuth";
import { UserRepository } from "../../utils/repositories/userRepository";

const useBecomeCreator = () => {
  const navigate = useNavigate();
  const { profile } = useAuth();
  const [loading, setLoading] = useState(false);
  const [isArtist, setIsArtist] = useState(false);
  const { userInfo } = useUserInfo();

  useEffect(() => {
    setIsArtist(profile?.role === "Artist");
  }, [profile]);

  const formik = useFormik<{
    category: string[];
    linkedin: string;
    instagram: string;
  }>({
    initialValues: {
      category: [],
      instagram: "",
      linkedin: "",
    },
    validate: (values) => {
      const errors: { [key: string]: string } = {};
      if (!values.instagram?.trim()) {
        errors.instagram = "Instagram is required for artists";
      } else {
        const instagramRegex =
          /^(https?:\/\/)?(www\.)?(instagram\.com|instagr\.am)\/[A-Za-z0-9._]+\/?$/;
        if (!instagramRegex.test(values.instagram.trim())) {
          errors.instagram = "Invalid Instagram URL";
        }
      }

      if (!values.linkedin?.trim()) {
        errors.linkedin = "LinkedIn is required for artists";
      } else {
        const linkedinRegex =
          /^(https?:\/\/)?(www\.)?linkedin\.com\/in\/[A-Za-z0-9_-]+\/?$/;
        if (!linkedinRegex.test(values.linkedin.trim())) {
          errors.linkedin = "Invalid LinkedIn URL";
        }
      }
      if (!values.category) {
        errors.artCategory = "Art category is required";
      }
      return errors;
    },
    onSubmit: async (values) => {
      setLoading(true);
      try {
        if (userInfo) {
          await UserRepository.becomeArtist(
            userInfo.id,
            values.instagram,
            values.linkedin,
            values.category,
          );
          window.location.reload();
        } else {
          console.error("User is not logged in");
        }
      } catch (error) {
        console.error("Error updating user profile:", error);
      } finally {
        setLoading(false);
      }
    },
  });

  return {
    formik,
    loading,
    isArtist,
    navigate,
  };
};

export default useBecomeCreator;
