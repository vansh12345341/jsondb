import { getAll, getOne, getOneBy, getAllBy, create, update, randomId, writeAll } from './index';
import fs from 'fs';

jest.mock('fs', () => ({
  readFileSync: jest.fn(),
  writeFileSync: jest.fn(),
}));

describe('JSON Database Operations', () => {
  beforeEach(() => {
    (fs.readFileSync as jest.Mock).mockReturnValue(JSON.stringify([
      { id: '1', name: 'vansh sharma', email: 'vansh432.sharma@gmail.com' },
      { id: '2', name: 'rohit', email: 'rohit@gmail.com' }
    ]));
  });

  test('getAll should return all items', () => {
    const items = getAll();
    expect(items.length).toBe(2);
    expect(items[0].name).toBe('vansh sharma');
  });

  test('getOne should return specific item by id', () => {
    const item = getOne('1');
    expect(item?.name).toBe('vansh sharma');
  });

  test('getOneBy should return item by a given field', () => {
    const item = getOneBy('email', 'vansh432.sharma@gmail.com');
    expect(item?.name).toBe('vansh sharma');
  });

  test('getAllBy should return all items that match a given field', () => {
    const items = getAllBy('name', 'vansh sharma');
    expect(items.length).toBe(1);
    expect(items[0].email).toBe('vansh432.sharma@gmail.com');
  });

  test('create should add a new item', () => {
    const newItem = { name: 'New Person', email: 'new@example.com' };
    create(newItem);
    expect(fs.writeFileSync).toHaveBeenCalled();
    const callArgs = (fs.writeFileSync as jest.Mock).mock.calls[0][1];
    expect(JSON.parse(callArgs).some((item: any) => item.name === 'New Person')).toBeTruthy();
  });

  test('update should modify an existing item', () => {
    const updatedData = { name: 'travis scott' };
    const updatedItem = update('1', updatedData);
    expect(updatedItem?.name).toBe('travis scott');
    expect(fs.writeFileSync).toHaveBeenCalled();
  });

  test('randomId should generate a unique identifier', () => {
    const id1 = randomId();
    const id2 = randomId();
    expect(id1).not.toBe(id2);
  });

  test('writeAll should overwrite all data', () => {
    const newData = [{ name: 'Completely New Data' }];
    writeAll(newData);

    expect(fs.writeFileSync).toHaveBeenCalled(); 


});
});
