import Pagination from "@/Components/Pagination";
import { TASK_STATUS_CLASS_MAP, TASK_STATUS_TEXT_MAP } from "@/Constants.js";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router ,Link } from "@inertiajs/react";
import  TextInput  from '@/Components/TextInput';
import Selectinput from "@/Components/Selectinput";
import TableHeading from './../../Components/TableHeading';
export default function Index ({auth,tasks,queryParams = null }) {
    queryParams = queryParams || {}
    const searchFieldChange = (name,value) => {
        if(value){
            queryParams[name] = value;
        }else{
            delete queryParams[name]

        }
        router.get(route('Task.index',queryParams))
    }
    const onKeyPress = (name , e) => {
        if(e.key !== "Enter") return;

        searchFieldChange(name,e.target.value);
    }
    const sortedChange = (name) => {
        if(name == queryParams.sort_field){
            if(queryParams.sort_direction == 'asc' ){
                queryParams.sort_direction = "desc"
            } else {
                queryParams.sort_direction = "asc"
            }
        } else {
            queryParams.sort_field = name ;
            queryParams.sort_direction = 'asc'
        }
      router.get(route('Task.index') , queryParams);
    }
    return(
    <AuthenticatedLayout
    user={auth}
    header={
        <h2 className="font-semibold text-x1 text-gray-800 dark:text-gray-200 leading-tight" >tasks</h2>
    }
    >
           <Head title="tasks" />

           <div className="py-12">
               <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                   <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                       <div className="p-6 text-gray-900 dark:text-gray-100">
                           <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400
                            border-b-2 border-gray-500">
                                <tr className="text-nowrap">
                                    <TableHeading
                                    name = "id"
                                    sort_direction={queryParams.sort_direction}
                                    sort_field={queryParams.sort_field}
                                    sortedChange={sortedChange}
                                    >
                                        ID
                                    </TableHeading>
                                    <th
                                     className="px-3 py-3">IMAGE
                                     </th>
                                    <TableHeading
                                    name = "name"
                                    sort_direction={queryParams.sort_direction}
                                    sort_field={queryParams.sort_field}
                                    sortedChange={sortedChange}
                                    >
                                        NAME
                                    </TableHeading>
                                    <TableHeading
                                    name = "status"
                                    sort_direction={queryParams.sort_direction}
                                    sort_field={queryParams.sort_field}
                                    sortedChange={sortedChange}
                                    >
                                        STATUS
                                    </TableHeading>
                                    <TableHeading
                                    name = "created_at"
                                    sort_direction={queryParams.sort_direction}
                                    sort_field={queryParams.sort_field}
                                    sortedChange={sortedChange}
                                    >
                                        CREATED AT
                                    </TableHeading>
                                    <TableHeading
                                    name = "due_date"
                                    sort_direction={queryParams.sort_direction}
                                    sort_field={queryParams.sort_field}
                                    sortedChange={sortedChange}
                                    >
                                        DUE DATE
                                    </TableHeading>
                                    <TableHeading
                                    name = "due_date"
                                    sort_direction={queryParams.sort_direction}
                                    sort_field={queryParams.sort_field}
                                    sortedChange={sortedChange}
                                    >
                                        PROJECT NAME
                                    </TableHeading>
                                    <TableHeading
                                    name = "due_date"
                                    sort_direction={queryParams.sort_direction}
                                    sort_field={queryParams.sort_field}
                                    sortedChange={sortedChange}
                                    >
                                        ASSEIGNED TO
                                    </TableHeading>
                                    <th
                                     className="px-3 py-3">CREATED BY</th>
                                    <th
                                     className="px-3 py-3">ACTIONS</th>
                                </tr>
                            </thead>
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400
                            border-b-2 border-gray-500">
                                <tr className="text-nowrap">
                                    <th className="px-3 py-3"></th>
                                    <th className="px-3 py-3"></th>
                                    <th className="px-3 py-3">
                                        <TextInput className="w-full "
                                        defaultValue={queryParams.name}
                                        placeholder = "Task Name"
                                        onBlur = {e => searchFieldChange("name" , e.target.vakue)}
                                        onKeyPress = {e => onKeyPress('name',e)}
                                        />
                                    </th>
                                    <th className="px-3 py-3">
                                        <Selectinput defaultValue = {queryParams.status} className="w-full"onChange= {e => searchFieldChange("status", e.target.value)}>
                                            <option value="">select Status</option>
                                            <option value="pending">pending</option>
                                            <option value="in_progress">in progress</option>
                                            <option value="completed">completed</option>
                                        </Selectinput>
                                    </th>
                                    <th className="px-3 py-3"></th>
                                    <th className="px-3 py-3"></th>
                                    <th className="px-3 py-3"></th>
                                    <th className="px-3 py-3"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {

                                    tasks.data.map(task => (
                                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={task.id}>
                                           <td>{task.id}</td>
                                           <td>
                                            <img src={task.image_path} style={{width:60} } />
                                           </td>
                                           <td>{task.name}</td>
                                           <td>
                                            <span
                                            className={
                                                "px-2 py-1 rounded text-white " + TASK_STATUS_CLASS_MAP[task.status]
                                            }
                                            >
                                            {TASK_STATUS_TEXT_MAP[task.status]}
                                            </span>
                                            </td>
                                           <td>{task.created_at}</td>
                                           <td>{task.due_date}</td>
                                           <td>{task.project.name}</td>
                                           <td>{task.assignedUser.name}</td>
                                           <td>{task.created_by.name}</td>
                                           <td className="px-3 py-2 text-nowrap">
                                            <Link
                                              href='#'
                                              className="font-medium text-blue-600 dark:text-blue-500 hover:underline mx-1"
                                            >
                                              Edit
                                            </Link>
                                            <button
                                              onClick={(e) => console.log(e.currentTarget)}
                                              className="font-medium text-red-600 dark:text-red-500 hover:underline mx-1"

                                            >
                                              Delete
                                            </button>
                                          </td>
                                        </tr>
                                   ))
                                }

                            </tbody>
                           </table>
                           <Pagination Links={tasks.meta.links} />
                       </div>
                   </div>
               </div>
           </div>

    </AuthenticatedLayout>
    )
}