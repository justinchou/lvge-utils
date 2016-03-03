#include <node.h>
#include <node_buffer.h>

#include <ctime>
#include <iostream>
#include <cstdlib>

#include <limits>

#define MAX INT_MAX 

using namespace v8;
using namespace std;

Handle<Value> SeedRandom(const Arguments & args){
	HandleScope scope;

	Local<Number> SeedNumber;

	unsigned num;
	int seed, seed1, seed2, seed3;
	if(args.Length() < 1 || !args[0]->IsNumber())
	{
		num = time(0);
	} else {
		num = args[0]->NumberValue();
	}
	srand(num);
	seed  = rand();

	SeedNumber = Number::New(seed);

	return scope.Close(SeedNumber);
}

Handle<Value> Srand(const Arguments & args){
	HandleScope scope;

	unsigned num;
	if(args.Length() < 1 || !args[0]->IsNumber())
	{
		num = time(0);
	} else {
		num = args[0]->NumberValue();
	}
	srand(num);

	return scope.Close(Undefined());
}

Handle<Value> Rand(const Arguments & args){
	HandleScope scope;

	Local<Number> SeedNumber;
	int seed  = rand();
	SeedNumber = Number::New(seed);

	return scope.Close(SeedNumber);
}

void init(Handle<Object> target, Handle<Object> module){
	
	target->Set(String::NewSymbol("SeedRandom"),
		FunctionTemplate::New(SeedRandom)->GetFunction());
	target->Set(String::NewSymbol("Srand"),
		FunctionTemplate::New(Srand)->GetFunction());
	target->Set(String::NewSymbol("Rand"),
		FunctionTemplate::New(Rand)->GetFunction());

//	NODE_SET_METHOD(target, "SeedRandom", SeedRandom);
//	NODE_SET_METHOD(target, "Srand", Srand);
//	NODE_SET_METHOD(target, "Rand", Rand);
}

NODE_MODULE(SeedRandom, init);