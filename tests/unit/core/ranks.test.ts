/**
 * @jest-environment jsdom
 */
 import { setupTest } from '../../helper/setupTest';
 import { getRanks } from '../../../src/core/getRanks';
 
 describe('Get player stat', () => {
   test('Should get player stat', async () => {
     const page = await setupTest();
 
     const data = await getRanks(page);
 
     expect(data).toBeTruthy();
     expect(data).toMatchSnapshot();
   });
 });
 