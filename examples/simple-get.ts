// 오류 해결을 위해 src에서 직접 가져옴 (실제 사용 시에는 'fetson' 패키지에서 가져옴)
import { fetson } from '../src/index';


/**
 * Post 인터페이스 정의
 * 실제 API 응답 구조에 맞게 타입을 정의합니다.
 */
interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

/**
 * 기본 GET 요청 예제 - 타입스크립트 버전
 * 타입 정보를 활용하여 API 응답에 안전하게 접근합니다.
 */
async function getPostsWithType(): Promise<Post[]> {
  try {
    // 제네릭 타입을 사용하여 반환 타입 명시
    const posts = await fetson.get<Post[]>('https://jsonplaceholder.typicode.com/posts');
    
    console.log(`✅ 성공! ${posts.length}개의 포스트를 가져왔습니다.`);
    
    // 타입에 안전하게 접근 (타입스크립트 컴파일러가 체크)
    const firstPost = posts[0];
    console.log('📃 첫 번째 포스트 정보:');
    console.log(`- 게시물 ID: ${firstPost.id}`);
    console.log(`- 작성자 ID: ${firstPost.userId}`);
    console.log(`- 제목: ${firstPost.title}`);
    console.log(`- 내용: ${firstPost.body.substring(0, 100)}...`);
    
    return posts;
  } catch (error) {
    console.error('❌ GET 요청 실패:', error instanceof Error ? error.message : String(error));
    throw error;
  }
}

/**
 * 특정 ID의 포스트를 가져오는 함수
 * 함수 매개변수와 반환 타입을 명확하게 정의합니다.
 */
async function getPostById(id: number): Promise<Post> {
  try {
    const post = await fetson.get(`https://jsonplaceholder.typicode.com/posts/${id}`) as Post;
    console.log(`✅ ID ${id}번 포스트를 성공적으로 가져왔습니다:`);
    console.log(JSON.stringify(post, null, 2));
    return post;
  } catch (error) {
    console.error(`❌ ID ${id}번 포스트 가져오기 실패:`, error instanceof Error ? error.message : String(error));
    throw error;
  }
}

/**
 * 헤더를 포함한 GET 요청 예제
 * 타입스크립트의 유니온 타입과 옵셔널 파라미터를 활용합니다.
 */
async function getPostWithCustomHeaders(id: number): Promise<Post> {
  // 커스텀 헤더 정의
  const headers = {
    'Accept-Language': 'ko-KR',
    'X-Custom-Header': 'fetson-example',
    'Authorization': 'Bearer token-example'
  };
  
  try {
    // 헤더와 함께 GET 요청 보내기
    const post = await fetson.get(
      `https://jsonplaceholder.typicode.com/posts/${id}`,
      headers
    ) as Post;
    
    console.log(`✅ 커스텀 헤더와 함께 ID ${id}번 포스트를 가져왔습니다:`);
    console.log(JSON.stringify(post, null, 2));
    return post;
  } catch (error) {
    console.error(`❌ 커스텀 헤더 요청 실패:`, error instanceof Error ? error.message : String(error));
    throw error;
  }
}

// 예제 실행
console.log('===== 타입스크립트로 작성된 fetson 예제 =====');

// 비동기 실행 함수
async function runExample(): Promise<void> {
  try {
    // 1. 모든 포스트 가져오기
    await getPostsWithType();
    
    console.log('\n');
    
    // 2. 특정 ID의 포스트 가져오기
    await getPostById(1);
    
    console.log('\n');
    
    // 3. 커스텀 헤더와 함께 요청하기
    await getPostWithCustomHeaders(1);
    
    console.log('\n✨ 모든 예제가 성공적으로 실행되었습니다!');
  } catch (error) {
    console.error('❌ 예제 실행 중 오류 발생:', error instanceof Error ? error.message : String(error));
  }
}

// 예제 실행
runExample();
