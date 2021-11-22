<?php

declare(strict_types = 1);

namespace Source\Traffic;

final class GetTotalTraffic
{
    const IP = '192.168.0.162';

    public static final function fromSNMP()
    {
        $data = snmp2_get('192.168.0.158:161', 'public', '.1.3.6.1.4.1.8072.1.2.1.1.4.0.12.1.3.6.1.4.1.37476.9000.10.1.2.1.127');
        var_dump($data);
    }
}
