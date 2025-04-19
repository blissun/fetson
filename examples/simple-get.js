// 소스 파일 직접 참조하기 (빌드 필요 없음)
import { fetson } from '../dist/index.mjs';

/**
 * Post 타입 정의
 * @typedef {Object} Post
 * @property {number} userId - 게시물 작성자 ID
 * @property {number} id - 게시물 ID
 * @property {string} title - 게시물 제목
 * @property {string} body - 게시물 내용
 */

/**
 * 기본 GET 요청 예제 - 타입 정보 포함
 * JSONPlaceholder API를 사용해 데이터를 가져오는 타입이 안전한 예제입니다.
 */
async function getPostsWithType() {
  try {
    // 제네릭 타입을 사용하여 반환 타입 지정
    /** @type {Post[]} */
    const posts = await fetson.get('https://jsonplaceholder.typicode.com/posts');
    
    console.log(`\u2705 성공! ${posts.length}개의 포스트를 가져왔습니다.`);
    
    // 타입에 안전하게 접근
    const firstPost = posts[0];
    console.log('\ud83d\udcc3 첫 번째 포스트 정보:');
    console.log(`- 게시물 ID: ${firstPost.id}`);
    console.log(`- 작성자 ID: ${firstPost.userId}`);
    console.log(`- 제목: ${firstPost.title}`);
    console.log(`- 내용: ${firstPost.body.substring(0, 100)}...`);
    
    return posts; // 타입 정보가 포함된 결과값
  } catch (error) {
    console.error('\u274c GET 요청 실패:', error.message);
    throw error;
  }
}

/**
 * 특정 ID의 포스트를 가져오는 함수
 * @param {number} id - 가져올 포스트 ID
 * @returns {Promise<Post>} 포스트 객체
 */
async function getPostById(id) {
  try {
    /** @type {Post} */
    const post = await fetson.get(`https://jsonplaceholder.typicode.com/posts/${id}`);
    console.log(`\u2705 ID ${id}번 포스트를 성공적으로 가져왔습니다:`);
    console.log(JSON.stringify(post, null, 2));
    return post;
  } catch (error) {
    console.error(`\u274c ID ${id}번 포스트 가져오기 실패:`, error.message);
    throw error;
  }
}

// 예제 실행
console.log('===== 타입 안전성을 가진 fetson 예제 =====');

// 시퀀스 함수
async function runExample() {
  try {
    // 모든 포스트 가져오기
    await getPostsWithType();
    
    console.log('\n');
    
    // 특정 ID의 포스트 가져오기
    await getPostById(1);
    
    console.log('\n\u2728 모든 예제가 성공적으로 실행되었습니다!');
  } catch (error) {
    console.error('\u274c 예제 실행 중 오류 발생:', error);
  }
}

runExample();

