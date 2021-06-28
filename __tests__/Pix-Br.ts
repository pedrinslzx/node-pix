test('should be return a Payload, Field, Utils and constants when import this module', async () => {
  const module = await import('../src/index')
  expect(module).toHaveProperty('Payload')
  expect(module).toHaveProperty('Field')
  expect(module).toHaveProperty('Utils')
  expect(module).toHaveProperty('constants')
  expect(module).toHaveProperty('default')
})
