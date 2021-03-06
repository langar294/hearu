package com.landao.hearu.controller;

import com.landao.guardian.annotations.author.RequiredLogin;
import com.landao.hearu.util.FileUploadUtil;
import com.landao.web.plus.annotation.RequestController;
import com.landao.web.plus.model.response.CommonResult;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;


/**
 * 公共访问接口
 */
@RequestController("/api")
public class ApiController {


    /**
     * 文件上传
     * @param file 文件
     * @return 文件上传成功会返回文件地址字符串在data
     * 返回示例/hearu/2022-1-25/uuid.jpg
     * 文件服务器 http://110.40.157.12:8003/
     */
    @RequiredLogin
    @PostMapping("/upload")
    public CommonResult<String> upload(@RequestParam MultipartFile file){
        CommonResult<String> result=new CommonResult<>();

        if(file.isEmpty()){
            return result.error("文件不能为空");
        }

        String resAddress = FileUploadUtil.uploadFile(file);

        return result.body(resAddress);
    }

}
