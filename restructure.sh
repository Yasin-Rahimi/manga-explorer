#!/bin/bash

# رنگ‌ها برای خروجی بهتر
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}Starting project restructure...${NC}"

# 1. ایجاد پوشه‌های جدید در src (از ریشه پروژه فرض می‌شود در مسیر صحیح هستید)
mkdir -p src/pages/Home/components
mkdir -p src/pages/Search/components
mkdir -p src/pages/MangaDetails/components
mkdir -p src/components/common
mkdir -p src/layouts
mkdir -p src/lib

# 2. انتقال فایل‌های pages
echo -e "${GREEN}Moving pages...${NC}"
mv src/pages/Home.jsx src/pages/Home/Home.jsx
mv src/pages/Search.jsx src/pages/Search/Search.jsx
mv src/pages/MangaDetails.jsx src/pages/MangaDetails/MangaDetails.jsx

# 3. انتقال کامپوننت‌های اختصاصی Home
echo -e "${GREEN}Moving Home components...${NC}"
mv src/components/HeroBanner.jsx src/pages/Home/components/
mv src/components/HeroSection.jsx src/pages/Home/components/   # اگر HeroSection استفاده می‌شود (در نقش HeroBanner نیست)
mv src/components/Pagination.jsx src/pages/Home/components/
mv src/components/TrendingSection.jsx src/pages/Home/components/
mv src/components/hero/* src/pages/Home/components/
rmdir src/components/hero 2>/dev/null

# 4. انتقال کامپوننت‌های اختصاصی Search
echo -e "${GREEN}Moving Search components...${NC}"
mv src/components/search/* src/pages/Search/components/
rmdir src/components/search 2>/dev/null

# 5. انتقال کامپوننت‌های اختصاصی MangaDetails
echo -e "${GREEN}Moving MangaDetails components...${NC}"
mv src/components/manga/* src/pages/MangaDetails/components/
rmdir src/components/manga 2>/dev/null

# 6. انتقال کامپوننت‌های عمومی به components/common
echo -e "${GREEN}Moving common components...${NC}"
mv src/components/Header.jsx src/components/common/
mv src/components/Footer.jsx src/components/common/
mv src/components/BackButton.jsx src/components/common/
mv src/components/MangaCard.jsx src/components/common/
mv src/components/FilterButton.jsx src/components/common/

# 7. پوشه ui قبلاً در جای درستی است (src/components/ui) – تغییری نمی‌کند

# 8. انتقال layouts (اگر MainLayout.jsx وجود دارد)
echo -e "${GREEN}Moving layouts...${NC}"
mv src/layouts/MainLayout.jsx src/layouts/  # در صورت وجود

# 9. انتقال lib (api.js و utils.js اگر باشد)
echo -e "${GREEN}Moving lib files...${NC}"
mv src/lib/api.js src/lib/
# اگر utils.js دارید:
[ -f src/lib/utils.js ] && mv src/lib/utils.js src/lib/

# 10. حذف پوشه‌های خالی قدیمی
echo -e "${GREEN}Cleaning up empty directories...${NC}"
rmdir src/components/hero 2>/dev/null
rmdir src/components/search 2>/dev/null
rmdir src/components/manga 2>/dev/null
rmdir src/components/layout 2>/dev/null

# در صورت خالی شدن پوشه components (فقط common و ui باقی می‌ماند) – کاری نمی‌کنیم

echo -e "${YELLOW}Restructure completed!${NC}"
echo -e "${YELLOW}Please manually update import paths in all JavaScript files.${NC}"