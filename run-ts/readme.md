### TypeScript 상수 관리 3.4 ver
 1. 상수 : 변하지 않는 변수
 2. 리터럴 : 변수의 값이 변하지 않는 데이터
 3. Const Assertion  
    - 해당 표현식의 리터럴 유형은 확장 X  
    - 객체 리터럴 readonly
    - 배열 리터럴 readonly tuples
 4. tuples
    ```javascript
    //튜플 타입을 이용해 원소의 수와 각 원소의 타입이 정확히 지정된 배열의 타입을 정의할 수 있다.
    const nameAndHeight: [string, number] = ['안희종', 176];
    //Error : 타입 정의보다 더 많은, 혹은 더 적은 원소를 갖는 배열을 할당
    const invalidNameAndHeight: [string, number] = ['안희종', 176, 42];
    ```