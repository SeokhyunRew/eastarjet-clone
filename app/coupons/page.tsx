"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Gift, Plane, ArrowLeft, Calendar, Clock } from "lucide-react"

interface Coupon {
  id: number
  name: string
  description: string
  type: string
  obtainedAt: string
}

const getCouponIcon = (type: string) => {
  switch (type) {
    case "discount":
      return <Gift className="w-6 h-6" />
    case "upgrade":
      return <Plane className="w-6 h-6 rotate-45" />
    case "ticket":
      return <Plane className="w-6 h-6" />
    default:
      return <Gift className="w-6 h-6" />
  }
}

export default function CouponsPage() {
  const [coupons, setCoupons] = useState<Coupon[]>([])
  const [activeTab, setActiveTab] = useState("available")
  const router = useRouter()

  useEffect(() => {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem("isLoggedIn")
    if (!isLoggedIn) {
      router.push("/")
      return
    }

    // Load coupons from localStorage
    const savedCoupons = JSON.parse(localStorage.getItem("myCoupons") || "[]")
    setCoupons(savedCoupons)
  }, [router])

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const formatExpiryDate = (dateString: string) => {
    const date = new Date(dateString)
    // Add 30 days for expiry
    date.setDate(date.getDate() + 30)
    return date.toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
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
                <a href="#" className="text-gray-700 hover:text-red-600 font-medium">
                  항공권 예매
                </a>
                <a href="#" className="text-gray-700 hover:text-red-600 font-medium">
                  나의 예매
                </a>
                <a href="#" className="text-gray-700 hover:text-red-600 font-medium">
                  서비스 안내
                </a>
                <a href="#" className="text-gray-700 hover:text-red-600 font-medium">
                  이벤트
                </a>
                <a href="#" className="text-gray-700 hover:text-red-600 font-medium">
                  제휴상품
                </a>
              </nav>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">온라인체크인</span>
              <span className="text-sm text-gray-600">마이페이지</span>
              <span className="text-sm text-gray-600">고객센터</span>
              <span className="text-sm text-gray-600">한국어</span>
              <Button
                onClick={() => router.push("/main")}
                variant="outline"
                size="sm"
                className="text-red-600 border-red-600 hover:bg-red-50"
              >
                메인으로
              </Button>
              <Button onClick={() => router.push("/")} variant="outline" size="sm">
                로그아웃
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center mb-6">
          <Button
            onClick={() => router.push("/main")}
            variant="ghost"
            size="sm"
            className="text-gray-600 hover:text-gray-900 mr-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            돌아가기
          </Button>
          <h1 className="text-2xl font-bold text-gray-900">내 쿠폰함</h1>
        </div>

        <Card className="shadow-md">
          <CardContent className="p-0">
            <Tabs defaultValue="available" className="w-full">
              <div className="border-b">
                <TabsList className="flex w-full bg-white h-auto p-0">
                  <TabsTrigger
                    value="available"
                    onClick={() => setActiveTab("available")}
                    className={`flex-1 py-4 rounded-none border-b-2 ${
                      activeTab === "available" ? "border-red-600 text-red-600" : "border-transparent"
                    }`}
                  >
                    사용 가능한 쿠폰
                  </TabsTrigger>
                  <TabsTrigger
                    value="used"
                    onClick={() => setActiveTab("used")}
                    className={`flex-1 py-4 rounded-none border-b-2 ${
                      activeTab === "used" ? "border-red-600 text-red-600" : "border-transparent"
                    }`}
                  >
                    사용 완료 쿠폰
                  </TabsTrigger>
                  <TabsTrigger
                    value="expired"
                    onClick={() => setActiveTab("expired")}
                    className={`flex-1 py-4 rounded-none border-b-2 ${
                      activeTab === "expired" ? "border-red-600 text-red-600" : "border-transparent"
                    }`}
                  >
                    만료된 쿠폰
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="available" className="p-6">
                {coupons.length === 0 ? (
                  <div className="text-center py-16">
                    <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                      <Gift className="w-12 h-12 text-gray-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">아직 쿠폰이 없어요</h3>
                    <p className="text-gray-600 mb-6">별을 찾아서 특별한 쿠폰을 획득해보세요!</p>
                    <Button
                      onClick={() => router.push("/main")}
                      className="bg-red-600 hover:bg-red-700 text-white px-6 py-2"
                    >
                      별 찾으러 가기
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {coupons.map((coupon, index) => (
                      <div
                        key={`${coupon.id}-${index}`}
                        className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow"
                      >
                        <div className="flex flex-col md:flex-row">
                          {/* Coupon Left Side */}
                          <div className="bg-gray-50 p-4 md:w-1/4 flex flex-col items-center justify-center border-r">
                            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-2">
                              {getCouponIcon(coupon.type)}
                            </div>
                            <div className="text-center">
                              <p className="text-sm text-gray-500">쿠폰 번호</p>
                              <p className="text-xs font-mono">{`EST-${coupon.id.toString().substring(5, 13)}`}</p>
                            </div>
                          </div>

                          {/* Coupon Right Side */}
                          <div className="p-4 md:w-3/4">
                            <div className="flex justify-between items-start">
                              <div>
                                <h3 className="text-lg font-bold text-gray-900">{coupon.name}</h3>
                                <p className="text-sm text-gray-600 mt-1">{coupon.description}</p>
                              </div>
                              <Button className="bg-red-600 hover:bg-red-700 text-white text-sm">쿠폰 사용하기</Button>
                            </div>

                            <div className="mt-4 pt-4 border-t flex flex-wrap gap-4 text-xs text-gray-500">
                              <div className="flex items-center">
                                <Calendar className="w-3 h-3 mr-1" />
                                <span>발급일: {formatDate(coupon.obtainedAt)}</span>
                              </div>
                              <div className="flex items-center">
                                <Clock className="w-3 h-3 mr-1" />
                                <span>유효기간: {formatExpiryDate(coupon.obtainedAt)}까지</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </TabsContent>

              <TabsContent value="used" className="p-6">
                <div className="text-center py-16">
                  <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                    <Plane className="w-12 h-12 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">사용한 쿠폰이 없어요</h3>
                  <p className="text-gray-600">쿠폰을 사용하면 이곳에 표시됩니다</p>
                </div>
              </TabsContent>

              <TabsContent value="expired" className="p-6">
                <div className="text-center py-16">
                  <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                    <Clock className="w-12 h-12 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">만료된 쿠폰이 없어요</h3>
                  <p className="text-gray-600">쿠폰 유효기간은 발급일로부터 30일입니다</p>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <div className="mt-8 bg-gray-100 p-4 rounded-lg">
          <h3 className="font-medium text-gray-900 mb-2">쿠폰 이용 안내</h3>
          <ul className="text-sm text-gray-600 space-y-1 list-disc pl-5">
            <li>쿠폰은 발급일로부터 30일간 유효합니다.</li>
            <li>쿠폰은 1회만 사용 가능하며, 사용 후 자동으로 소멸됩니다.</li>
            <li>쿠폰은 타인에게 양도할 수 없습니다.</li>
            <li>일부 노선 및 기간에는 쿠폰 사용이 제한될 수 있습니다.</li>
            <li>자세한 내용은 고객센터로 문의해주세요.</li>
          </ul>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-100 border-t mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="mb-6 md:mb-0">
              <div className="text-red-600 text-xl font-bold mb-4">EASTAR JET</div>
              <p className="text-sm text-gray-600">
                서울특별시 강서구 하늘길 260 이스타항공 <br />
                사업자등록번호: 123-45-67890
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-2">이스타항공</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>회사소개</li>
                  <li>채용정보</li>
                  <li>투자정보</li>
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-2">운항정보</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>스케줄 조회</li>
                  <li>취항지 정보</li>
                  <li>항공기 안내</li>
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-2">항공권 예매</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>예매 안내</li>
                  <li>운임 안내</li>
                  <li>할인 제도</li>
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-2">서비스 안내</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>공항 서비스</li>
                  <li>기내 서비스</li>
                  <li>부가 서비스</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t flex flex-col md:flex-row justify-between items-center">
            <p className="text-xs text-gray-500">© 2023 EASTAR JET. All rights reserved.</p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">Facebook</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fillRule="evenodd"
                    d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">Instagram</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fillRule="evenodd"
                    d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 4.041v.08c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">YouTube</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fillRule="evenodd"
                    d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
