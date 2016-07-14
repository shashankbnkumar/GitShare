using Newtonsoft.Json;
using System;
using System.Web;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using TaskManager.DAL.Models;

namespace TaskManager.DAL.Repositories
{
    public class TaskRepository
    {

        public Task Create()
        {
            Task task = new Task();
            return task;
        }

        /// <summary>
        /// Retrieves the list of tasks.
        /// </summary>
        /// <returns></returns>
        public List<Task> Retrieve()
        {
            var filePath = System.Web.HttpContext.Current.Server.MapPath(@"~/App_Data/task.json");

            var json = System.IO.File.ReadAllText(filePath);

            var tasks = JsonConvert.DeserializeObject<List<Task>>(json);

            return tasks;
        }

        /// <summary>
        /// Saves a new task.
        /// </summary>
        /// <param name="task"></param>
        /// <returns></returns>
        public Task Save(Task task)
        {
            // Read in the existing tasks
            var tasks = this.Retrieve();

            // Assign a new Id
            var maxId = tasks.Max(p => p.TaskId);
            task.TaskId = maxId + 1;
            tasks.Add(task);

            WriteData(tasks);
            return task;
        }

        /// <summary>
        /// Updates an existing task
        /// </summary>
        /// <param name="id"></param>
        /// <param name="task"></param>
        /// <returns></returns>
        public Task Save(int id, Task task)
        {
            // Read in the existing tasks
            var tasks = this.Retrieve();

            // Locate and replace the item
            var itemIndex = tasks.FindIndex(p => p.TaskId == task.TaskId);
            if (itemIndex >= 0)
            {
                tasks[itemIndex] = task;
            }
            else
            {
                return null;
            }

            WriteData(tasks);
            return task;
        }


        private bool WriteData(List<Task> tasks)
        {
            // Write out the Json
            var filePath = System.Web.HttpContext.Current.Server.MapPath(@"~/App_Data/task.json");

            var json = JsonConvert.SerializeObject(tasks, Formatting.Indented);
            System.IO.File.WriteAllText(filePath, json);

            return true;
        }
    }
}