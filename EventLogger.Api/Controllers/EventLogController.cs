using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;

namespace EventLogger.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EventLogController : ControllerBase
    {
        private readonly IEventLoggerService _logService;
        public EventLogController(IEventLoggerService logService)
        {
            _logService = logService;
        }

        [Route("loggers")]
        [HttpGet]
        public IActionResult GetLoggers()
        {
            return _handleResponse(() => _logService.GetLoggers());
        }

        [Route("logs")]
        [HttpPost]
        public IActionResult GetLogs([FromBody] GetSourceLogsRequest request)
        {
            return _handleResponse(() => _logService.GetLogs(request.Source));
        }

        [Route("clear")]
        [HttpPost]
        public IActionResult ClearLogs([FromBody] GetSourceLogsRequest request)
        {
            return _handleResponse(() => _logService.ClearLogs(request.Source));
        }

        private IActionResult _handleResponse<R>(Func<R> func) where R : class
        {
            try
            {
                return Ok(func());
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }
    }
}
