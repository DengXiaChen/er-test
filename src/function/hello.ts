import {
  Provide,
  Inject,
  ServerlessTrigger,
  ServerlessTriggerType,
} from '@midwayjs/decorator';
import { Context } from '@midwayjs/faas';

import dcdn20180115, * as $dcdn20180115 from '@alicloud/dcdn20180115';
import * as $OpenApi from '@alicloud/openapi-client';

// 可填写参数
const accessKeyId = ''
const accessKeySecret = ''
const name = ''

const createClient = (): dcdn20180115 => {
  let config = new $OpenApi.Config({
    // 您的AccessKey ID
    accessKeyId,
    // 您的AccessKey Secret
    accessKeySecret,
  });
  // 访问的域名
  config.endpoint = "dcdn.aliyuncs.com";
  return new dcdn20180115(config);
}

@Provide()
export class HelloHTTPService {
  @Inject()
  ctx: Context;

  @ServerlessTrigger(ServerlessTriggerType.HTTP, {
    path: '/',
    method: 'post',
  })
  async handleHTTPEvent() {
    const client = createClient()
    const describeRoutineRequest = new $dcdn20180115.DescribeRoutineRequest({
      name,
    });
    const res = await client.describeRoutine(describeRoutineRequest);
    return res.body;
  }
}
