import Button from "./Button";

const FormProject = ({
  data,
  handleSubmit,
  handleChange,
  handleClose,
  title,
  typeButton,
}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-10 bg-black bg-opacity-20">
      <div className="relative w-full max-w-md max-h-full">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700 border border-gray-600">
          <button
            onClick={handleClose}
            className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
          >
            <svg
              className="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
          </button>
          <div className="px-6 py-6 lg:px-8">
            <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">
              {title}
            </h3>
            <form
              className="space-y-5"
              onSubmit={handleSubmit}
              encType="multipart/form-data"
            >
              <div>
                <label
                  htmlFor="title"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  value={data?.title}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  placeholder="Nguyen Ngoc Duc"
                  required
                  onChange={handleChange}
                />
              </div>
              <div>
                <label
                  htmlFor="description"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  description
                </label>
                <input
                  type="text"
                  name="description"
                  id="description"
                  value={data?.description}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  placeholder="Description"
                  required
                  onChange={handleChange}
                />
              </div>
              <div>
                <label
                  htmlFor="category"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Category
                </label>
                <select
                  name="category"
                  id="category"
                  className="block w-full p-2.5 mb-6 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  value={data?.category}
                  onChange={handleChange}
                >
                  <option value="">Select a category</option>
                  <option value="Education">Education</option>
                  <option value="Health">Health</option>
                  <option value="Environment">Environment</option>
                  <option value="Technology">Technology</option>
                </select>
              </div>
              <div>
                <label
                  htmlFor="StartDate"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Start Date
                </label>
                <input
                  type="date"
                  name="StartDate"
                  id="StartDate"
                  value={data?.StartDate}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  placeholder="date"
                  required
                  onChange={handleChange}
                />
              </div>
              <div>
                <label
                  htmlFor="EndDate"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  EndDate
                </label>
                <input
                  type="date"
                  name="EndDate"
                  id="EndDate"
                  value={data?.EndDate}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  placeholder="Enter a secure EndDate"
                  required
                  onChange={handleChange}
                />
              </div>
              <div>
                <label
                  htmlFor="Status"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Status
                </label>
                <select
                  name="Status"
                  id="Status"
                  className="block w-full p-2.5 mb-6 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  value={data?.Status}
                  onChange={handleChange}
                >
                  <option value="">Select a status</option>
                  <option value="ongoing">ongoing</option>
                  <option value="upcoming">upcoming</option>
                  <option value="completed">completed</option>
                </select>
              </div>

              <div className="flex items-center justify-center gap-5 w-full">
                <Button type="button" onClick={handleClose}>
                  Cancel
                </Button>
                <Button type="submit">{typeButton}</Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormProject;
