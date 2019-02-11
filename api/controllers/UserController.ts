import { Controller, Get, BaseRequest, BaseResponse, HttpError, HttpCode, Post } from 'ts-framework';
import { UserModel } from '../models';
import UserService from '../services/UserService';

@Controller('/users')
export default class UserController {

  /**
   * GET /
   * 
   * @description Using Blockahin Insper SDK UserService method showUser() to show an User.
   */

  @Get('/:id')
  static async show(req: BaseRequest, res: BaseResponse) {
    try {

      // Using UserService method createUser() to create an User.
      const user = await UserService.showUser(
        req.param("id")
      );
      
      return res.success(user)
      
    } catch (e) {
      console.error(e)
    };
  };


    /**
   * POST /
   * 
   * @description Using Blockahin Insper SDK UserService method storeUser() to create an User.
   */

  @Post('/')
  static async store(req: BaseRequest, res: BaseResponse) {
    try {

      // Get body statements.
      const { firstName, lastName, email, password } = req.body

      // Using UserService method createUser() to create an User.
      const user = await UserService.storeUser(
        firstName,
        lastName,
        email,
        password
      );
      
      return res.success(user)
      
    } catch (e) {
      console.error(e)
    };
  };
}