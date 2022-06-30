package dev.pomyharry.stocksimulator.back.service;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

import dev.pomyharry.stocksimulator.back.model.dto.KakaoDTO;
import dev.pomyharry.stocksimulator.back.model.entity.Customer;
import dev.pomyharry.stocksimulator.back.model.entity.Kakao;
import dev.pomyharry.stocksimulator.back.repository.CustomerRepository;
import dev.pomyharry.stocksimulator.back.repository.KakaoRepository;

@Service
public class KakaoServiceImpl implements KakaoService {

	@Autowired
	private KakaoRepository kakaoRepository;
	@Autowired
	private CustomerRepository customerRepository;

	@Override
	public String getAccessToken (String authorize_code) {
		String access_Token = "";
		String refresh_Token = "";
		String reqURL = "https://kauth.kakao.com/oauth/token";

		try {
			URL url = new URL(reqURL);
            
			HttpURLConnection conn = (HttpURLConnection) url.openConnection();
			// POST 요청을 위해 기본값이 false인 setDoOutput을 true로
            
			conn.setRequestMethod("POST");
			conn.setDoOutput(true);
			// POST 요청에 필요로 요구하는 파라미터 스트림을 통해 전송
            
			BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(conn.getOutputStream()));
			StringBuilder sb = new StringBuilder();
			sb.append("grant_type=authorization_code&");
            sb.append("client_secret=5gqaSELk6uZgmrZ5SNKN3AasfVyppQYV&");
            sb.append("client_id=ef23cfa2f66fcc25924f54647f3f5460&");
            sb.append("redirect_uri=http://localhost:8090/kakaologin");
            
			sb.append("&code=" + authorize_code);
			bw.write(sb.toString());
			bw.flush();
            
			// 결과 코드가 200이라면 성공
			int responseCode = conn.getResponseCode();
			System.out.println("responseCode : " + responseCode);
            
			// 요청을 통해 얻은 JSON타입의 Response 메세지 읽어오기
			BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream()));
			String line = "";
			String result = "";
            
			while ((line = br.readLine()) != null) {
				result += line;
			}
			System.out.println("response body : " + result);
            
			// Gson 라이브러리에 포함된 클래스로 JSON파싱 객체 생성
			JsonParser parser = new JsonParser();
			JsonElement element = parser.parse(result);
            
			access_Token = element.getAsJsonObject().get("access_token").getAsString();
			refresh_Token = element.getAsJsonObject().get("refresh_token").getAsString();
            
			System.out.println("access_token : " + access_Token);
			System.out.println("refresh_token : " + refresh_Token);
            

			br.close();
			bw.close();
		} catch (IOException e) {
			e.printStackTrace();
		}
		return access_Token;
	}

	@Override
	public KakaoDTO getUserInfo(String access_Token){
		
		// 요청하는 클라이언트마다 가진 정보가 다를 수 있기에 HashMap타입으로 선언
		 HashMap<String, Object> userInfo = new HashMap<String, Object>();

		 String reqURL = "https://kapi.kakao.com/v2/user/me";
		 try {
			 URL url = new URL(reqURL);
			 HttpURLConnection conn = (HttpURLConnection) url.openConnection();
			 conn.setRequestMethod("GET");
	 
			 // 요청에 필요한 Header에 포함될 내용
			 conn.setRequestProperty("Authorization", "Bearer " + access_Token);
	 
			 int responseCode = conn.getResponseCode();
			 System.out.println("responseCode : " + responseCode);
	 
			 BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream(),"UTF-8"));
	 
			 String line = "";
			 String result = "";
	 
			 while ((line = br.readLine()) != null) {
				 result += line;
			 }
			 br.close();
			 System.out.println("response body : " + result);
			 conn.disconnect();

			 JsonParser parser = new JsonParser();
			 JsonElement element = parser.parse(result);
	 
			 JsonObject properties = element.getAsJsonObject().get("properties").getAsJsonObject();
			 JsonObject kakao_account = element.getAsJsonObject().get("kakao_account").getAsJsonObject();
			 
			 String user_id = element.getAsJsonObject().get("id").getAsString();
			 String nickname = properties.getAsJsonObject().get("nickname").getAsString();
			 String email = kakao_account.getAsJsonObject().get("email").getAsString();
 
 
			 userInfo.put("id", user_id);
			 userInfo.put("nickname", nickname);
			 userInfo.put("email", email);
		
		
			 
			} catch (IOException e) {
				e.printStackTrace();
			}
			//return kakaoRepository.findByEmail(userInfo);
			return new KakaoDTO(userInfo.get("id").toString(), userInfo.get("nickname").toString(), userInfo.get("email").toString());

    }

	@Override
    public void kakaoLogin(String access_Token) {

		// 1. email을가지고 디비에 조회를한다.
		Kakao succLogin = kakaoRepository.findByEmail(getUserInfo(access_Token).getEmail());

		// 2-1 email이있다 ? 로그인시킨다
		// 2-2 email이없다 ? 회원가입 하라는 알림창
		// if(succLogin == null){
		// 	throw new NeedKakaoJoinException(errMsg:"회원가입을 진행해주세요");
		// }
		if (succLogin != null || succLogin.getEmail() == getUserInfo(access_Token).getEmail() ) {
			System.out.println(succLogin.getEmail() +"/////");
			System.out.println(getUserInfo(access_Token).getEmail()+"///");

			Customer customer = new Customer();
			customer.setId(succLogin.getId());
			customer.setName(succLogin.getName());
			customer.setEmail(succLogin.getEmail());

			customerRepository.save(customer);	
			System.out.println("들어갔니?"+ customer);
		}
		
		
    }


	@Override
    public KakaoDTO kakaoJoin(String access_Token) {

		// 1. email을가지고 디비에 조회를한다.
		Kakao succLogin = kakaoRepository.findByEmail(getUserInfo(access_Token).getEmail());
			System.out.println(succLogin);

			// 2-1 email이없다 ? 디비에 값을 인서트 시킴
			// 2-1 email이있다 ? 로그인 하라는 알림창
			if (succLogin == null) {				
				// customer에 id 저장후 
				Customer customer = new Customer();
				customer.setId(getUserInfo(access_Token).getId());
				customer.setName(getUserInfo(access_Token).getName());
				customer.setEmail(getUserInfo(access_Token).getEmail());

				customerRepository.save(customer);				

				// email로 조회
				Customer c = customerRepository.findByEmail("email");

				// kakao에도 가져온 id 넣기
				Kakao kakao = new Kakao();
				kakao.setId(c.getId());
				kakao.setName(c.getName());
				kakao.setEmail(c.getEmail());

				kakaoRepository.save(kakao);
				
				

			}else if(succLogin != null & succLogin.getEmail() == getUserInfo(access_Token).getEmail()){
				System.out.println("중복된 이메일입니다. 로그인 해주세요");
			}
		// kakao로 조회
		Kakao searchInfo = kakaoRepository.findByEmail(getUserInfo(access_Token).getEmail());

		return new KakaoDTO(searchInfo.getId(), searchInfo.getName(), searchInfo.getEmail());
    }

}

