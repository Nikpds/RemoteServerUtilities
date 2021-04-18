using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;

namespace RemoteServerUtilities.Api
{
    public class EventLoggerService : IEventLoggerService
    {
        public EventLoggerService()
        {

        }

        public List<LogSourceView> GetLoggers()
        {

            EventLog[] remoteEventLogs;

            remoteEventLogs = EventLog.GetEventLogs("DESKTOP-L9O20VR");
            List<LogSourceView> logs = new List<LogSourceView>();
            foreach (EventLog log in remoteEventLogs)
            {

                if (log.Log != "Security")
                {
                    logs.Add(new LogSourceView(log));
                }
            }
            return logs;
        }

        public List<LogView> GetLogs(string source)
        {

            EventLog eventLog = new EventLog();
            if (EventLog.SourceExists(source))
            {
                eventLog.Source = source;
                List<LogView> logs = new List<LogView>();
                foreach (EventLogEntry entry in eventLog.Entries)
                {
                    logs.Add(new LogView(entry));
                }
                return logs.OrderByDescending(x => x.Created).Take(50).ToList();
            }
            throw new Exception("Source Does not exist");

        }

        public SimpleResponse ClearLogs(string source)
        {
            EventLog eventLog = new EventLog();
            if (EventLog.SourceExists(source))
            {
                eventLog.Source = source;
                eventLog.Clear();
                return new SimpleResponse() { Success = true };
            }
            return new SimpleResponse();

        }
    }
}
