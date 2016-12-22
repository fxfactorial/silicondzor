export default {
  success: 'success',
  failure: 'failure',
  fail(reason) { return JSON.stringify({result:this.failure, reason}); },
  ok() { return JSON.stringify({result:this.success}); }
};
