It is not possible to use a logging system in a Web page
because a client can not write on the local filesystem

This in "theory".

Javascript API:

    File System API (2023)
        https://developer.mozilla.org/en-US/docs/Web/API/File_System_API

    (It requires confirm every time??)


FileSystemWritableFileStream
    Chrome 86
    Edge 86
    Firefox 111
    Opera 72


File System API
--------------
    https://developer.chrome.com/docs/capabilities/web-apis/file-system-access

    HumanFS
        https://github.com/humanwhocodes/humanfs
        https://github.com/humanwhocodes/humanfs/blob/main/docs/README.md


Remote solution
---------------

    1) client library with a 'logger'
    2) the logger events are collected in memory
    3) every tot seconds/n of events, they are sent to the server
    4) the server collect the information and print them on the logging system



Nodejs Logging libraries
------------------------

Nodejs logging libraries
------------------------

    https://betterstack.com/community/guides/logging/best-nodejs-logging-libraries

    https://betterstack.com/community/guides/logging/how-to-install-setup-and-use-pino-to-log-node-js-applications/
    https://betterstack.com/community/guides/logging/how-to-install-setup-and-use-winston-and-morgan-to-log-node-js-applications/


Winston
    https://github.com/winstonjs/winston

    npm install winston

Pino
    https://github.com/pinojs/pino

    npm install pino

Morgan

Log4js-node
    https://github.com/log4js-node/log4js-node

    npm install log4js
    npm install log4js-json-layout

Buyan
    https://github.com/trentm/node-bunyan

Roarr

Signale

Tracer


