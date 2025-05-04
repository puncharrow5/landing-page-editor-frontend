"use client";

import React, { useState } from "react";
import { useRouter } from "next/router";
import { useToastMessage } from "@/hooks";
import { LoginMutationVariables, useLoginMutation } from "@/graphql/generated/types";
import { BeatLoader } from "react-spinners";
import * as S from "./LoginForm.style";

export const LoginForm = () => {
  const router = useRouter();
  const { ToastMessage } = useToastMessage();

  const [variables, setVariables] = useState<LoginMutationVariables>({
    email: "",
    password: "",
  });

  const [loadLogin, { loading }] = useLoginMutation({
    onCompleted: () => {
      router.push("/dashboard");
    },
    onError: (e) => {
      ToastMessage("error", e.message ?? e);
    },
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    switch (true) {
      case !variables.email:
        return ToastMessage("error", "이메일을 입력해주세요.");
      case !variables.password:
        return ToastMessage("error", "비밀번호를 입력해주세요.");
    }

    loadLogin({
      variables,
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setVariables({
      ...variables,
      [name]: value,
    });
  };

  const handleRouteRegister = () => {
    router.push("/register");
  };

  return (
    <S.Container>
      <S.Box>
        <h1 className="mb-6 text-center text-3xl font-bold">로그인</h1>
        <S.Label>관리자 이메일</S.Label>
        <S.Input
          type="email"
          name="email"
          value={variables.email}
          onChange={handleChange}
          autoComplete="off"
        />
        <S.Label>비밀번호</S.Label>
        <S.Input
          type="password"
          name="password"
          value={variables.password}
          onChange={handleChange}
          autoComplete="off"
        />
        <S.Button onClick={handleLogin}>
          {loading ? <BeatLoader size={10} speedMultiplier={0.75} color="#FFF" /> : <p>로그인</p>}
        </S.Button>

        <div className="w-full h-[1px] mt-[20px] mb-[10px] bg-[#e7e7ec]" />
        <div className="w-full text-center leading-[1]">
          <p
            onClick={handleRouteRegister}
            className="text-[12px] text-[#3a3a3a] font-bold cursor-pointer"
          >
            계정 등록
          </p>
        </div>
      </S.Box>
    </S.Container>
  );
};
