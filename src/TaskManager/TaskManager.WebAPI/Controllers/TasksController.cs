
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Http.Description;
using System.Web.OData;
using TaskManager.DAL.Models;
using TaskManager.DAL.Repositories;
using TaskManager.Models;

namespace TaskManager.Controllers
{
    [EnableCorsAttribute("http://localhost:59905", "*", "*")]

    public class TasksController : ApiController
    {
        // GET: api/Tasks
        [EnableQuery()]
        [ResponseType(typeof(Task))]
        public IHttpActionResult Get()
        {
            try
            {
                var taskRepository = new TaskRepository();
                return Ok(taskRepository.Retrieve().AsQueryable());

            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        // GET: api/Tasks/5
        [Authorize]
        [ResponseType(typeof(Task))]
        public IHttpActionResult Get(int id)
        {
            try
            {
                Task task;
                var taskRepository = new TaskRepository();

                if (id > 0)
                {
                    var tasks = taskRepository.Retrieve();
                    task = tasks.FirstOrDefault(p => p.TaskId == id);
                    if (task == null)
                    {
                        return NotFound();
                    }
                }
                else
                {
                    task = taskRepository.Create();
                }
                return Ok(task);
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }





        // POST: api/Tasks
        [Authorize]
        [ResponseType(typeof(Task))]
        public IHttpActionResult Post([FromBody]Task task)
        {
            try
            {
                if (task == null)
                {
                    return BadRequest("Task cannot be null");
                }

                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                var taskRepository = new TaskRepository();
                var newTask = taskRepository.Save(task);
                if (newTask == null)
                {
                    return Conflict();
                }
                return Created<Task>(Request.RequestUri + newTask.TaskId.ToString(),
                    newTask);
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        // PUT: api/Tasks/5
        [Authorize]
        public IHttpActionResult Put(int id, [FromBody]Task task)
        {
            try
            {
                if (task == null)
                {
                    return BadRequest("Task cannot be null");
                }
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                var taskRepository = new TaskRepository();
                var updatedTask = taskRepository.Save(id, task);
                if (updatedTask == null)
                {
                    return NotFound();
                }
                return Ok();
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        // DELETE: api/Tasks/5
        [Authorize]
        public void Delete(int id)
        {
        }
    }
}
