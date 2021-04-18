using System;
using System.Diagnostics;

namespace RemoteServerUtilities.Api
{
    public class LogView
    {
        public DateTime Created { get; set; }

        public string Message { get; set; }

        public string Username { get; set; }

        public string MachineName { get; set; }

        public string Category { get; set; }

        public string EntryType { get; set; }

        public LogView(EventLogEntry entry)
        {
            Category = entry.Category;
            MachineName = entry.MachineName;
            Message = entry.Message;
            Created = entry.TimeWritten;
            Username = entry.UserName;
            EntryType = entry.EntryType.ToString();
        }
    }
}

