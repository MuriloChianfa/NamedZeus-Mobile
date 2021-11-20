<?php

declare(strict_types = 1);

require __DIR__ . '/vendor/autoload.php';

use \Source\Server\Basic as BasicServer;

use Swoole\WebSocket\Server;
use Swoole\WebSocket\Frame;

$server = new Server('0.0.0.0', SERVER_PORT);

$server->on("Start", function(Server $server)
{
    echo "Swoole WebSocket Server is started at http://192.168.0.124:4444\n";
});

$server->on('Open', function(Server $server, Swoole\Http\Request $request)
{
    echo "connection open: {$request->fd}\n";

    $server->tick(1000, function() use ($server, $request)
    {
        $server->push($request->fd, json_encode(["hello", time()]));
    });
});

$server->on('Message', function(Server $server, Frame $frame)
{
    echo "received message: {$frame->data}\n";
    var_dump($server->getClientInfo($request->fd));
    $server->push($frame->fd, json_encode(["hello", time()]));
});

$server->on('Close', function(Server $server, int $fd)
{
    var_dump($server->getClientInfo($fd));
    echo "connection close: {$fd}\n";
});

$server->on('Disconnect', function(Server $server, int $fd)
{
    echo "connection disconnect: {$fd}\n";
});

$server->start();
