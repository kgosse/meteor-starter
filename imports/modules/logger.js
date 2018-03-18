import { Logger } from 'meteor/ostrio:logger';
import { LoggerConsole } from 'meteor/ostrio:loggerconsole';

const log = new Logger();

(new LoggerConsole(log)).enable({
    enable: true,
    filter: ['ERROR', 'FATAL', 'WARN', 'DEBUG', 'INFO'], /* Filters: 'ERROR', 'FATAL', 'WARN', 'DEBUG', 'INFO', 'TRACE', '*' */
    client: true, // Set to `false` to avoid log transfer from Client to Server
    server: true  // Set to `false` to disallow execution on Server
  });

export default log;