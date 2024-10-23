//date fns
import { format } from "date-fns";
import formatDistanceToNow from "date-fns/formatDistanceToNow";

const ProjectTable = ({
  ProjectsData,
  handleFetchProject,
  handleRemoveProject,
}) => {
  return (
    <div className="relative overflow-x-auto sm:rounded-lg shadow-md">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gary-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Title
            </th>
            <th scope="col" className="px-6 py-3">
              Description
            </th>
            <th scope="col" className="px-6 py-3">
              Category
            </th>
            <th scope="col" className="px-6 py-3">
              Start
            </th>
            <th scope="col" className="px-6 py-3">
              End
            </th>
            <th scope="col" className="px-6 py-3">
              Status
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {ProjectsData.length > 0 &&
            ProjectsData.map((project) => (
              <tr
                key={project._id}
                className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {project.title}
                </th>
                <td className="px-6 py-4">{project.description}</td>
                <td className="px-6 py-4">{project.category}</td>
                <td className="px-6 py-4">
                  {format(new Date(project.StartDate), "MMM d, yyyy")}
                  <p className="text-xs text-gray-400 mb-2">
                    {formatDistanceToNow(new Date(project.StartDate), {
                      addSuffix: true,
                    })}
                  </p>
                </td>
                <td className="px-6 py-4">
                {format(new Date(project.EndDate), "MMM d, yyyy")}
                  <p className="text-xs text-gray-400 mb-2">
                    {formatDistanceToNow(new Date(project.StartDate), {
                      addSuffix: true,
                    })}
                  </p>
                </td>
                <td className="px-6 py-4">{project.Status}</td>
                <td className="px-2 py-4">
                  <button
                    onClick={() => handleFetchProject(project._id)}
                    type="button"
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline mr-4"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleRemoveProject(project._id)}
                    type="button"
                    className="font-medium text-red-600 dark:text-red-500 hover:underline"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProjectTable;
