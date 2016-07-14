using System;

namespace TaskManager.DAL.Models
{
    public class Task
    {
        public long TaskId { get; set; }

        public string Title { get; set; }

        public string Details { get; set; }

        public DateTime? DueDate { get; set; }

        public DateTime? CompletedDate { get; set; }
    }
}