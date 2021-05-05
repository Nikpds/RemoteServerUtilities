using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;

namespace EventLogger.Api.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class EventLogController : ControllerBase
    {
        private readonly IEventLoggerService _logService;
        private readonly ILogger _logger;
        public EventLogController(IEventLoggerService logService, ILogger<EventLogController> logger)
        {
            _logService = logService;
            _logger = logger;
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
                _logger.LogError(ex.Message);
                return BadRequest(ex.Message);
            }

        }
    }
}
