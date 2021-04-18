using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RemoteServerUtilities.Api
{
    public interface IEventLoggerService
    {
        List<LogSourceView> GetLoggers();

        List<LogView> GetLogs(string source);

        SimpleResponse ClearLogs(string source); 
    }
}
