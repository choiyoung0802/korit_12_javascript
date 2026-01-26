function getPerson() {
  return {
    fName: '영',
    lName: '김',
    age: 20,
    email: 'kim0@test.com',
    city: '부산광역시',
    contry: '대한민국'
  };
}
// 이상의 코드가 있다고 가정했을 때 email 값과 city 의 값을 출력하고 싶다면 어떡해야 할까요?
// 실행 예
/*
해당 지원자는 부산광역시에 살고 있으면 email 은 kim0@test.com 입니다.
*/
let kim0 = getPerson(); // 함수 호출 결과가 object 니까 걔를 변수에 대입한 다음
console.log(`해당 지원자는 ${kim0.city}에 살고 있으며, email 은 ${kim0.email} 입니다.`); // 객체명.key 값을 통해서 해당 value를 불러냄.

let kimEmail = getPerson().email; // 애체오 객체의 특정 key 의 value 만 변수에 저장하고
let kimCity = getPerson().city;
console.log(`해당 지원자는 ${kimCity}에 살고 있으며, email 은 ${kimEmail} 입니다.`); // 콘솔에 찍힐 수 있도록 했음.

// 객체의 추출하고자 하는 key 와 동일한 변수를 선언합니다. {} 내에.
let {email, city} = getPerson(); // 이렇게 쓰면 email 이라고 하는 변수에 getPerson().email 의 value 값이, city 라고 하는 변수에 getPerson().city 의 변수값이 들어갑니다.
console.log(`해당 지원자는 ${city}에 살고 있으며, email 은 ${email} 입니다.`);

function displayFullName({fName, lName}) { // 매개변수가 구조분해되어있음을 {} 로 알 수 있음.
  console.log(`${lName} ${fName}`);
}
displayFullName(getPerson()); // 그러면 argument 로는 key 로 fName / lName 을 가지고 있는 애가 필수적으로 요구됩니다. - 호출시의 argument 와 정의 시의 매개변수의 차이점에 주목할 것. -> React 에서 허구한 날 쓰이기 때문에 꼭 알아둘 것.