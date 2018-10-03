package de.adesso.testanwendung;

import org.json.JSONArray;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.PropertySource;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Date;

@PropertySource(ignoreResourceNotFound = true, value = "assetspath.properties")
@Controller
public class DemoData {
    @Value("${pathToResources}")
    String path;

    private String uri = "http://localhost:8080/assessment/";
    private Long offset;

    @Bean
    public RestTemplate restTemplate(RestTemplateBuilder builder) {
        return builder.build();
    }

    @Bean
    public CommandLineRunner run(RestTemplate restTemplate) {
        return args -> {
            try {
                demoEmails(restTemplate);

            } catch (HttpClientErrorException ex) {
                ex.printStackTrace();
            }
        };
    }

    private void demoEmails(RestTemplate restTemplate) {

        File file = new File(path + "emails.json");
        try {
            BufferedReader br = new BufferedReader(new FileReader(file));
            StringBuilder sb = new StringBuilder();
            String st;

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);

            while ((st = br.readLine()) != null)
                sb.append(st);



                JSONArray emails = new JSONArray(sb.toString());
                for(int i = 0; i < emails.length(); i++) {
                HttpEntity<String> entity = new HttpEntity<String>(emails.getJSONObject(i).toString(), headers);
                ResponseEntity<String> response = restTemplate.postForEntity(uri+ "createEmail", entity, String.class);
                System.out.println(response);
            }

        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    private String parseAndUpdateDateString(String string) throws ParseException {
        String pattern = "([\\w\\W]*)(\\d{4}-\\d{2}-\\d{2})([\\w\\W]*)";

        if (string.matches(pattern) && !string.contains("aktivVon")) {
            String dateString = string.replaceAll(pattern, "$2");
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
            LocalDate date = LocalDate.parse(dateString, formatter);

            if (this.offset == null)
                offset = LocalDate.now().toEpochDay() - date.toEpochDay() + 20;

            date = date.plusDays(offset);
            return string.replaceAll(pattern, "$1" + date.format(formatter)+ "$3");
        }
        return string;
    }
}
