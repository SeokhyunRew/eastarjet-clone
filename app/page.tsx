"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function LoginPage() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (username && password) {
      localStorage.setItem("isLoggedIn", "true")
      router.push("/main")
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-8">
              <div className="text-red-600 text-2xl font-bold">EASTAR JET</div>
              <nav className="hidden md:flex space-x-8">
                <a href="#" className="text-gray-700 hover:text-red-600">
                  항공권 예매
                </a>
                <a href="#" className="text-gray-700 hover:text-red-600">
                  나의 예매
                </a>
                <a href="#" className="text-gray-700 hover:text-red-600">
                  서비스 안내
                </a>
                <a href="#" className="text-gray-700 hover:text-red-600">
                  이벤트
                </a>
                <a href="#" className="text-gray-700 hover:text-red-600">
                  제휴상품
                </a>
              </nav>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">영어/한국어</span>
              <span className="text-sm text-gray-600">나의 아스타</span>
              <span className="text-sm text-gray-600">고객센터</span>
            </div>
          </div>
        </div>
      </header>

      {/* Login Form */}
      <div className="flex justify-center items-center min-h-[calc(100vh-200px)] py-12">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">로그인</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <form onSubmit={handleLogin} className="space-y-4">
              <Input
                type="text"
                placeholder="아이디"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="h-12"
                required
              />
              <Input
                type="password"
                placeholder="비밀번호"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-12"
                required
              />
              <Button type="submit" className="w-full h-12 bg-red-600 hover:bg-red-700 text-white font-medium">
                로그인
              </Button>
            </form>

            <Button variant="outline" className="w-full h-12 border-pink-300 text-pink-600 hover:bg-pink-50">
              📱 휴대폰 간편 로그인
            </Button>

            <div className="flex justify-center space-x-4 text-sm text-gray-600 pt-4">
              <a href="#" className="hover:text-red-600">
                아이디 찾기
              </a>
              <span>|</span>
              <a href="#" className="hover:text-red-600">
                비밀번호 찾기
              </a>
              <span>|</span>
              <a href="#" className="hover:text-red-600">
                회원가입
              </a>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="text-2xl font-bold">EASTAR JET</div>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-white">
                개인정보처리방침
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                이용약관
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                사이트맵
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
