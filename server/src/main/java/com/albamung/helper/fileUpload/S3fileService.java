package com.albamung.helper.fileUpload;

import com.amazonaws.HttpMethod;
import com.amazonaws.services.s3.AmazonS3;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.util.Calendar;
import java.util.Date;
import java.util.UUID;

@Service
public class S3fileService {
    private static final Logger LOG = LoggerFactory.getLogger(S3fileService.class);

    private final AmazonS3 amazonS3;

    @Value("${s3.bucket.name}")
    private String s3BucketName;

    public S3fileService(AmazonS3 amazonS3) {
        this.amazonS3 = amazonS3;
    }

    private String generateUrl(String fileName, HttpMethod httpMethod) {
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(new Date());
        calendar.add(Calendar.MINUTE, 2); // Generated URL will be valid for 2minutes
        return amazonS3.generatePresignedUrl(s3BucketName, fileName, calendar.getTime(), httpMethod).toString();
    }

    @Async
    public String findByName(String fileName) {
        if (!amazonS3.doesObjectExist(s3BucketName, fileName))
            return "File does not exist";
        LOG.info("Generating signed URL for file name {}", fileName);
        return generateUrl(fileName, HttpMethod.GET);
    }
    public String createUUIDFileName(String extension, String dirName){
        String fileName = dirName + UUID.randomUUID().toString() + extension;
        return fileName;
    }

    @Async
    public void delete(String fileName) {
        amazonS3.deleteObject(s3BucketName, fileName);
    }

    @Async
    public String save(String fileName) {
        return generateUrl(fileName, HttpMethod.PUT);
    }
}
