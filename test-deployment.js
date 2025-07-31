#!/usr/bin/env node

const API_BASE = 'https://cursorai-project.onrender.com/api';

async function testEndpoint(endpoint, options = {}) {
  try {
    const url = `${API_BASE}${endpoint}`;
    console.log(`Testing: ${url}`);
    
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });
    
    const data = await response.json();
    
    console.log(`Status: ${response.status} ${response.statusText}`);
    console.log('Response:', JSON.stringify(data, null, 2));
    console.log('---');
    
    return response.ok;
  } catch (error) {
    console.error(`Error testing ${endpoint}:`, error.message);
    return false;
  }
}

async function runTests() {
  console.log('🚀 Testing deployed backend at:', API_BASE);
  console.log('='.repeat(50));
  
  // Test 1: Health endpoint
  console.log('1. Testing health endpoint...');
  const healthOk = await testEndpoint('/health');
  
  // Test 2: Register endpoint
  console.log('2. Testing register endpoint...');
  const registerOk = await testEndpoint('/auth/register', {
    method: 'POST',
    body: JSON.stringify({
      email: 'test@example.com',
      password: 'testpassword',
      firstName: 'Test',
      lastName: 'User',
      businessName: 'Test Business',
      subdomain: 'test-business'
    }),
  });
  
  // Test 3: Login endpoint
  console.log('3. Testing login endpoint...');
  const loginOk = await testEndpoint('/auth/login', {
    method: 'POST',
    body: JSON.stringify({
      email: 'test@example.com',
      password: 'testpassword'
    }),
  });
  
  console.log('='.repeat(50));
  console.log('📊 Test Results:');
  console.log(`Health: ${healthOk ? '✅ PASS' : '❌ FAIL'}`);
  console.log(`Register: ${registerOk ? '✅ PASS' : '❌ FAIL'}`);
  console.log(`Login: ${loginOk ? '✅ PASS' : '❌ FAIL'}`);
  
  const allPassed = healthOk && registerOk && loginOk;
  console.log(`\nOverall: ${allPassed ? '✅ ALL TESTS PASSED' : '❌ SOME TESTS FAILED'}`);
}

runTests().catch(console.error); 