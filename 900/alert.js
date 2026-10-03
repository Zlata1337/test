/* Copyright (C) 2023-2025 anonymous

This file is part of PSFree and is distributed under the GNU Affero
General Public License, version 3 or later.
*/

function formatError(reason, event) {
    var value = reason || (event && event.message) || 'Unknown error';
    var source = (reason && reason.sourceURL) || (event && event.filename) || '';
    var line = (reason && reason.line) || (event && event.lineno) || '';
    var column = (reason && reason.column) || (event && event.colno) || '';
    var stack = (reason && reason.stack) || '';
    return String(value) + '\n' + source + ':' + line + ':' + column + (stack ? '\n' + stack : '');
}

addEventListener('unhandledrejection', function (event) {
    alert('Unhandled rejection\n' + formatError(event.reason, event));
});

addEventListener('error', function (event) {
    alert('Unhandled error\n' + formatError(event.error, event));
    return true;
});

// index.html completes firmware detection before deferred modules execute.
// Never start the chain on an unsupported or unidentified browser.
if (window.ps4FirmwareSupported === true) {
    import('./psfree.js');
}
