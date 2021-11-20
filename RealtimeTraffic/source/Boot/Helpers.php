<?php

/**
 * @param \Throwable $exception
 * @return void
 */
function exceptionHandler($exception) {
    $errorCode = @$exception->getCode();
    $errorMessage = @$exception->getMessage();

    if (!empty($exception->getTrace())) {
        $errorLine = @$exception->getTrace()[0]['line'] ?? '';
        $errorFile = @$exception->getTrace()[0]['file'] ?? '';
    }

    error_log((empty($errorLine)) ? "[{$errorCode}] {$errorMessage}" : "[{$errorCode}] {$errorMessage} on line {$errorLine} of file {$errorFile}");
}
