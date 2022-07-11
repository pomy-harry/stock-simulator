package dev.pomyharry.stocksimulator.back.service;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.HashMap;
import java.util.Optional;

import dev.pomyharry.stocksimulator.back.security.TokenProvider;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

import dev.pomyharry.stocksimulator.back.exception.DuplicationException;
import dev.pomyharry.stocksimulator.back.exception.IdNotFoundException;
import dev.pomyharry.stocksimulator.back.model.dto.OAuthDTO;
import dev.pomyharry.stocksimulator.back.model.entity.Customer;
import dev.pomyharry.stocksimulator.back.model.entity.OAuth;
import dev.pomyharry.stocksimulator.back.repository.CustomerRepository;
import dev.pomyharry.stocksimulator.back.repository.OAuthRepository;

@Slf4j
@Service
public class KakaoServiceImpl implements OAuthService {

	@Autowired
	private OAuthRepository kakaoRepository;

	@Autowired
	private CustomerRepository customerRepository;

	@Autowired
	private TokenProvider tokenProvider;

	HttpURLConnection conn;
	// 사용할시 반드시 try 문 안에서 사용해주세요(NPE 체크해줘야함)
	private HttpURLConnection getConnection(String reqURL){
		try {
			URL url = new URL(reqURL);
			conn = (HttpURLConnection) url.openConnection();
		} catch (MalformedURLException e) {
			System.out.println("URL 오류");
		} catch (IOException e) {
			System.out.println("Http 연결 오류");
		}
		return conn;
		
	}
	@Override 
	public String getAccessTokenForLogin (String authorize_code) {
		String access_Token = "";
		String refresh_Token = "";
		String reqURL = "https://kauth.kakao.com/oauth/token";
		System.out.println(authorize_code);
		
		try {
            HttpURLConnection con = getConnection(reqURL);
			// POST 요청을 위해 기본값이 false인 setDoOutput을 true로
			con.setRequestMethod("POST");
			con.setDoOutput(true);
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
		}finally{
			conn.disconnect();
		}
		return access_Token;
	}

	@Override
	public String getAccessTokenForJoin (String authorize_code) {
		String access_Token = "";
		String refresh_Token = "";
		String reqURL = "https://kauth.kakao.com/oauth/token";

		try {
			HttpURLConnection con = getConnection(reqURL);
			con.setRequestMethod("POST");
			con.setDoOutput(true);
			// POST 요청에 필요로 요구하는 파라미터 스트림을 통해 전송     
			BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(conn.getOutputStream()));
			StringBuilder sb = new StringBuilder();
			sb.append("grant_type=authorization_code&");
            sb.append("client_secret=5gqaSELk6uZgmrZ5SNKN3AasfVyppQYV&");
            sb.append("client_id=ef23cfa2f66fcc25924f54647f3f5460&");
            sb.append("redirect_uri=http://localhost:8090/kakaojoin");
			
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
	public OAuthDTO getUserInfo(String access_Token){
		
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
			//System.out.println("response body : " + result);
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
			return OAuthDTO.builder()
					.id(userInfo.get("id").toString())
					.name(userInfo.get("nickname").toString())
					.email(userInfo.get("email").toString())
					.type("kakao")
					.customerId(userInfo.get("id").toString())
					.build();
    }

	@Override
    public OAuthDTO kakaoLogin(String access_Token) {
		log.debug("==== LOGIN ====");

		OAuthDTO oauth = getUserInfo(access_Token);
		// 1. id, email을가지고 디비에 조회를한다.
		Optional<OAuth> succLogin = kakaoRepository.findById(oauth.getId());
		Customer customer = customerRepository.findByEmail(oauth.getEmail());

		// 2-1 email이없다 ? IdNotFoundException
		if(!succLogin.isPresent()){
			throw new IdNotFoundException("Id cannot be found");
		}
		else{
			return OAuthDTO.builder()
					.id(oauth.getId())
					.name(customer.getName())
					.email(customer.getEmail())
					.customerId(customer.getId())
					.build();
		}

    }


	@Override
    public OAuthDTO kakaoJoin(String access_Token) {
		log.debug("==== JOIN ====");
		OAuthDTO oauth = getUserInfo(access_Token);

		// 1. id을가지고 디비에 조회를한다.
		Optional<OAuth> K_Id = kakaoRepository.findById(oauth.getId());

		System.out.println(K_Id + "////");


		// 2-1 id가 없다 ? 디비에 값을 인서트 시킴
		// 2-1 id가 있다 ? 로그인 하라는 알림창
		if(K_Id.isPresent()){
			throw new DuplicationException("Id is duplicated.");
		}
		else {

			// customer에 저장후
			Customer customer = new Customer();
			customer.setName(oauth.getName());
			customer.setEmail(oauth.getEmail());

			customerRepository.save(customer); 
			System.out.println("들어갔니 customer?"+ customer);

			// kakao에도 가져온 id 넣기
			OAuth kakao = new OAuth();
			kakao.setId(oauth.getId());
			kakao.setType("kakao");
			kakao.setCustomer(customer);

			kakaoRepository.save(kakao);
			System.out.println("들어갔니kakao?"+ kakao);

			return OAuthDTO.builder()
					.customerId(kakao.getCustomer().getId())
					.build();
		}

		//return null;
    }

	public String getJWT(OAuthDTO kakao){
		final String token = tokenProvider.createToken(kakao.getCustomerId());
		return token;
	}

}
