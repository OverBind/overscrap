/**
 * @jest-environment jsdom
 */
 import { setupTest } from '../../helper/setupTest';
 import { getInfo } from '../../../src/core/getInfo';
 
 describe('Get player stat', () => {
   test('Should get player stat', async () => {
     const page = await setupTest();
 
     const data = await getInfo(page);
 
     expect(data).toBeTruthy();
     expect(data).toMatchSnapshot();
   });
 });
 