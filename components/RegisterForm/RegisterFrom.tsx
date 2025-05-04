"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { useToastMessage } from "@/hooks";
import {
  CreateAdminMutationVariables,
  useCreateAdminMutation,
  useSendVerifyCodeMutation,
  useVerifyEmailMutation,
} from "@/graphql/generated/types";
import { BeatLoader } from "react-spinners";
import { getTimeFormat, regexEmail, regexEmoji, regexName, regexPassword } from "@/utils";
import * as S from "./RegisterForm.style";

export const RegisterForm = () => {
  const router = useRouter();
  const { ToastMessage } = useToastMessage();

  const secondsRef = useRef<NodeJS.Timeout | null>(null);

  const [variables, setVariables] = useState<CreateAdminMutationVariables>({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
  });
  const [isActive, setIsActive] = useState<boolean>(false);
  const [isVerified, setIsVerified] = useState<boolean>(false);
  const [verifyCode, setVerifyCode] = useState<string>("");
  const [seconds, setSeconds] = useState<number>(180);

  const [loadSendVerifyCode, { loading: sendVerifyCodeLoading }] = useSendVerifyCodeMutation({
    onCompleted: () => {
      setSeconds(180);
      setIsActive(true);

      ToastMessage("info", "이메일로 인증 번호가 전송되었습니다.");
    },
    onError: (e) => {
      ToastMessage("error", e.message ?? e);
    },
  });

  const [loadVerifyEmail, { loading: verifyEmailLoading }] = useVerifyEmailMutation({
    onCompleted: () => {
      setIsVerified(true);

      ToastMessage("info", "이메일 인증이 완료되었습니다.");
    },
    onError: (e) => {
      ToastMessage("error", e.message ?? e);
    },
  });

  const [loadCreateAdmin, { loading: createAdminLoading }] = useCreateAdminMutation({
    onCompleted: () => {
      ToastMessage("success", "계정 등록이 완료되었습니다.");

      router.push("/login");
    },
    onError: (e) => {
      ToastMessage("error", e.message ?? e);
    },
  });

  const handleSendVerifyCode = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    loadSendVerifyCode({
      variables: {
        email: variables.email,
      },
    });
  };

  const handleVerifyEmail = (e: React.FormEvent) => {
    e.preventDefault();

    if (!verifyCode) {
      return ToastMessage("error", "인증코드를 입력해주세요.");
    }

    loadVerifyEmail({
      variables: {
        email: variables.email,
        verifyCode,
      },
    });
  };

  const handleChangeVerifyCode = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVerifyCode(e.target.value);
  };

  const handleChangeForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setVariables({
      ...variables,
      [name]: value,
    });
  };

  const handleCreateAdmin = (e: React.FormEvent) => {
    e.preventDefault();

    switch (true) {
      case !variables.email:
        return ToastMessage("error", "이메일을 입력해주세요.");
      case !regexEmail.test(variables.email):
        return ToastMessage("error", "올바른 형식의 이메일을 입력해주세요.");
      case !variables.name:
        return ToastMessage("error", "이름을 입력해주세요.");
      case !regexName.test(variables.name):
        return ToastMessage("error", "이름은 한글, 영문, 숫자만 입력 가능합니다.");
      case regexEmoji.test(variables.name):
        return ToastMessage("error", "이름에는 이모지를 사용할 수 없습니다.");
      case !variables.password:
        return ToastMessage("error", "비밀번호를 입력해주세요.");
      case !regexPassword.test(variables.password):
        return ToastMessage("error", "비밀번호는 영문, 숫자, 특수문자 포함 8~20자로 입력해주세요.");
      case !variables.confirmPassword:
        return ToastMessage("error", "비밀번호 확인을 입력해주세요.");
      case variables.password !== variables.confirmPassword:
        return ToastMessage("error", "비밀번호가 일치하지 않습니다.");
      case !isVerified:
        return ToastMessage("error", "이메일 인증을 완료해주세요.");
    }

    loadCreateAdmin({
      variables,
    });
  };

  const handleRouteLogin = () => {
    return router.push("/login");
  };

  useEffect(() => {
    if (isActive && seconds > 0) {
      secondsRef.current = setTimeout(() => setSeconds(seconds - 1), 1000);
    }
    if (seconds === 0) {
      ToastMessage("error", "인증 시간이 만료되었습니다.");
    }
    return () => {
      if (secondsRef.current) {
        clearTimeout(secondsRef.current);
        secondsRef.current = null;
      }
    };
  }, [isActive, seconds]);

  return (
    <S.Container>
      <S.Box>
        <h1 className="mb-6 text-center text-3xl font-bold">계정 등록</h1>
        <S.Label>이메일</S.Label>
        <div className="relative flex gap-x-[8px]">
          <S.Input
            type="email"
            name="email"
            value={variables.email}
            onChange={handleChangeForm}
            autoComplete="off"
          />
          <S.EmailButton onClick={handleSendVerifyCode} disabled={isVerified}>
            {sendVerifyCodeLoading ? (
              <BeatLoader size={10} speedMultiplier={0.75} color="#FFF" />
            ) : isActive ? (
              <p>재전송</p>
            ) : (
              <p>인증</p>
            )}
          </S.EmailButton>
        </div>

        {isActive && (
          <div className="relative flex gap-x-[8px]">
            <S.Input name="verifyCode" value={verifyCode} onChange={handleChangeVerifyCode} />
            <S.EmailButton onClick={handleVerifyEmail} disabled={isVerified}>
              {verifyEmailLoading ? (
                <BeatLoader size={10} speedMultiplier={0.75} color="#FFF" />
              ) : (
                <p>확인</p>
              )}
            </S.EmailButton>
            {isActive && !isVerified && (
              <p className="absolute top-[14px] right-[80px] text-[12px]  text-[#E9455A] leading-[1] tracking-wide">
                {getTimeFormat(seconds)}
              </p>
            )}
          </div>
        )}

        <S.Label>이름</S.Label>
        <S.Input name="name" value={variables.name} onChange={handleChangeForm} />

        <S.Label>비밀번호</S.Label>
        <S.Input
          type="password"
          name="password"
          value={variables.password}
          onChange={handleChangeForm}
          autoComplete="off"
        />

        <S.Label>비밀번호 확인</S.Label>
        <S.Input
          type="password"
          name="confirmPassword"
          value={variables.confirmPassword}
          onChange={handleChangeForm}
          autoComplete="off"
        />
        <S.SubmitButton onClick={handleCreateAdmin}>
          {createAdminLoading ? (
            <BeatLoader size={10} speedMultiplier={0.75} color="#FFF" />
          ) : (
            <p>계정 등록</p>
          )}
        </S.SubmitButton>

        <div className="w-full h-[1px] mt-[20px] mb-[10px] bg-[#e7e7ec]" />
        <div className="w-full text-center leading-[1]">
          <div
            onClick={handleRouteLogin}
            className="text-[12px] text-[#3a3a3a] font-bold cursor-pointer"
          >
            로그인
          </div>
        </div>
      </S.Box>
    </S.Container>
  );
};
