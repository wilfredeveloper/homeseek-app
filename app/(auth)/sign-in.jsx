import { StyleSheet, Text, View, ScrollView, Image, Alert } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import FormField from "../../components/navigation/FormField";
import CustomButton from "../../components/CustomButton";
import { Link, router } from "expo-router";
import { signIn } from "../../lib/appwrite";

const SignIn = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const submit = async () => {
    if (!form.email || !form.password) {
      Alert.alert("Error", "All fields are required");
    }
    setSubmitting(true);

    try {
      const session = await signIn(form.username, form.email, form.password);

      // Set result to global state using context
      router.replace("/home");
    } catch (error) {
      Alert.alert("Error", error.message); 

    } finally {
      setSubmitting(false);
    }
  };
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="justify-center min-h-[85vh] w-full px-6 my-6">
          <Image
            source={images.logo}
            className="w-[115px] h-[35px]"
            resizeMode="contain"
          />
          <Text className="text-white mt-10 text-2xl font-psemibold text-semibold">
            Log in to Aora
          </Text>
          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(email) => setForm({ ...form, email: email })}
            otherStyles="mt-7"
            keyBoardType="email-address"
          />
          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(password) =>
              setForm({ ...form, password: password })
            }
            otherStyles="mt-7"
          />
          <CustomButton
            title="Sign in"
            containerStyles="mt-7"
            handlePress={submit}
            isLoading={submitting}
          />

          <View className="flex-row justify-center mt-7 pt-5 gap-2">
            <Text className="text-gray-100 font-pregular text-md">
              Dont have an account?
            </Text>
            <Link href="/sign-up" className="text-secondary font-psemibold text-md">
              Sign up
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;

const styles = StyleSheet.create({});
