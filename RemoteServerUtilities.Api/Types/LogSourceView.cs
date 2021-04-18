using System.Diagnostics;

namespace RemoteServerUtilities.Api
{
    public class LogSourceView
    {
        public string Name { get; set; }
        public string Source { get; set; }
        public int Entries { get; set; }
        public string LogDisplayName { get; set; }

        public LogSourceView(EventLog entry)
        {
            Entries = entry.Entries.Count;
            LogDisplayName = entry.LogDisplayName;
            Name = entry.Log;
            Source = entry.Source;
        }
    }
}
