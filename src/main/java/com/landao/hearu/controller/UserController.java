package com.landao.hearu.controller;

import com.landao.checker.annotations.Check;
import com.landao.checker.annotations.special.TelePhone;
import com.landao.checker.annotations.special.group.AddCheck;
import com.landao.checker.annotations.special.group.UpdateCheck;
import com.landao.guardian.annotations.author.RequiredLogin;
import com.landao.hearu.author.UserService;
import com.landao.hearu.model.enums.RoleEnum;
import com.landao.hearu.model.user.LoginVO;
import com.landao.hearu.model.user.UserInfo;
import com.landao.hearu.model.user.UserInfoVO;
import com.landao.web.plus.annotation.RequestController;
import com.landao.web.plus.model.response.CommonResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import javax.annotation.Resource;
import java.util.Locale;
import java.util.Objects;

/**
 * 用户相关
 */
@RequestController("/user")
public class UserController {

    @Resource
    UserService userService;

    /**
     * 获取用户基本信息
     */
    @RequiredLogin
    @GetMapping("/info")
    public CommonResult<UserInfoVO> info() {
        CommonResult<UserInfoVO> result = new CommonResult<>();

        UserInfoVO userInfo = userService.getUserInfo(userService.getUserId());

        return result.body(userInfo);
    }

    /**
     * 用户登陆
     *
     * @param telephone 电话号码|13034744809
     * @param password  密码(md5加密)|e10adc3949ba59abbe56e057f20f883e
     */
    @PostMapping("/login")
    public CommonResult<LoginVO> login(@TelePhone String telephone,
                                       @Check(value = "密码", min = 32, max = 32) String password) {
        CommonResult<LoginVO> result = new CommonResult<>();


        LoginVO loginVO = userService.login(telephone, password.toLowerCase(Locale.ROOT));

        return result.body(loginVO);
    }

    /**
     * 用户注册
     *
     * @param userInfo 用户信息
     */
    @PostMapping("/register")
    @AddCheck
    public CommonResult<Void> register(@RequestBody UserInfo userInfo) {

        boolean save = userService.registerUser(userInfo, RoleEnum.Ordinary);

        return CommonResult.ok(save);
    }

    /**
     * 修改个人信息
     *
     * @param userInfo 不要传递telephone和password
     *                 userId 也不需要传递
     */
    @RequiredLogin
    @UpdateCheck
    @PostMapping("/change/info")
    public CommonResult<Void> changeInfo(@RequestBody UserInfo userInfo) {
        userInfo.setId(userService.getUserId());

        boolean update = userService.changeUserInfo(userInfo);

        return CommonResult.ok(update);
    }

    /**
     * 修改密码
     *
     * @param oldPassword 原密码
     * @param newPassword 新密码
     * @apiNote 两个都用md5加密
     */
    @RequiredLogin
    @PostMapping("/change/password")
    public CommonResult<Void> changePassword(@Check(value = "旧秘密", min = 32, max = 32) String oldPassword,
                                             @Check(value = "新秘密", min = 32, max = 32) String newPassword) {

        if (Objects.equals(oldPassword, newPassword)) {
            return CommonResult.err("新密码不能和旧密码相同");
        }

        boolean update = userService.changePassword(oldPassword, newPassword);

        if (update) {
            userService.logout();
        }

        return CommonResult.ok(update);
    }

}
