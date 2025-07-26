import Button from "Components/Button";
import PageMeta from "Components/PageMeta";
import PictureLayout from "Components/PictureLayout";
import { FaCheckSquare, FaSquare } from "react-icons/fa";
import { Post_Categories } from "Types";
import Background from "../../assets/Background.png";
import Leaf from "../../assets/Leaf.png";
import useBecomeCreator from "./useBecomeCreator";

const BecomeCreator = () => {
  const { formik, loading, isArtist, navigate } = useBecomeCreator();

  return (
    <PictureLayout
      title="Create and inspire"
      backgroundImage={Background}
      decorationImage={Leaf}
    >
      <PageMeta
        title="Become an Artbranch Creator – Upgrade from Audience to Artist"
        description="Join Artbranch as a creator and showcase your artistic talent. Easily migrate from an audience member to an artist and share your work with the world."
      />

      <div className="mb-10 flex justify-center md:justify-start">
        <div
          className="cursor-pointer transition-transform duration-300 hover:-translate-x-1 hover:scale-[1.01]"
          onClick={() => navigate(-1)}
        >
          {"<"} Go Back
        </div>
      </div>

      {isArtist ? (
        <>
          <h2 className="mb-8 text-3xl font-bold">You are already an Artist</h2>
          <Button
            title="Manage Your Portfolio"
            className="w-full rounded-lg bg-[#131114] p-[10px_30px] text-[20px] font-bold leading-[24px] text-[#F5F3EE] hover:bg-gray-800"
            onClick={() => navigate("/portfolio")}
          />
        </>
      ) : (
        <>
          <h2 className="mb-8 text-3xl font-bold">
            All we need to get you listed
          </h2>

          <form onSubmit={formik.handleSubmit} className="space-y-6">
            <div>
              <input
                id="insagram"
                name="instagram"
                type="text"
                value={formik.values.instagram}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full rounded-lg border p-6"
                style={{
                  borderColor: "#E6E2DC",
                  height: "84px",
                  padding: "30px 20px",
                }}
                placeholder="Instagram URL"
              />
              {formik.touched.instagram && formik.errors.instagram ? (
                <div className="mt-2 text-red-500">
                  {" "}
                  {formik.errors.instagram}{" "}
                </div>
              ) : null}
            </div>

            <div>
              <input
                id="linkedin"
                name="linkedin"
                type="text"
                value={formik.values.linkedin}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full rounded-lg border p-6"
                style={{
                  borderColor: "#E6E2DC",
                  height: "84px",
                  padding: "30px 20px",
                }}
                placeholder="Linkedin URL"
              />
              {formik.touched.instagram && formik.errors.linkedin ? (
                <div className="mt-2 text-red-500">
                  {" "}
                  {formik.errors.linkedin}{" "}
                </div>
              ) : null}
            </div>
            <div className="mb-3 grid grid-cols-2 space-y-2 lg:grid-cols-3">
              {Object.values(Post_Categories).map((category: string) => (
                <div key={category} className="flex items-center">
                  <input
                    type="checkbox"
                    id={category}
                    checked={formik.values.category.includes(category)}
                    onChange={() => {
                      const newCategories = formik.values.category.includes(
                        category,
                      )
                        ? formik.values.category.filter(
                            (cat) => cat !== category,
                          )
                        : [...formik.values.category, category];

                      formik.setFieldValue("category", newCategories);
                    }}
                    className="hidden"
                  />
                  <span
                    className="cursor-pointer text-blue-600"
                    onClick={() => {
                      const newCategories = formik.values.category.includes(
                        category,
                      )
                        ? formik.values.category.filter(
                            (cat) => cat !== category,
                          )
                        : [...formik.values.category, category];

                      formik.setFieldValue("category", newCategories);
                    }}
                  >
                    {formik.values.category.includes(category) ? (
                      <FaCheckSquare className="h-5 w-5 text-blue-600" />
                    ) : (
                      <FaSquare className="h-5 w-5 text-gray-300" />
                    )}
                  </span>
                  <label
                    htmlFor={category}
                    className="ml-2 text-sm font-medium text-gray-700"
                  >
                    {category}
                  </label>
                </div>
              ))}
            </div>

            {formik.touched.category && formik.errors.category && (
              <div className="mt-2 text-red-500">{formik.errors.category}</div>
            )}

            <Button
              title="Continue"
              className={`w-full rounded-lg p-[10px_30px] text-[20px] font-bold leading-[24px] ${
                loading ? "bg-gray-500" : "bg-[#131114] hover:bg-gray-800"
              } text-[#F5F3EE]`}
              type="submit"
              disabled={loading}
              loading={loading}
              withTransition
            />
          </form>
        </>
      )}
    </PictureLayout>
  );
};

export default BecomeCreator;
