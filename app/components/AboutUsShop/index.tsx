"use client";
import { motion } from "framer-motion";

function AboutUsShop() {
  return (
    <div>
      <div className="bg-gray-100 px-6 py-12 md:px-20">
        <motion.div
          className="mx-auto max-w-4xl text-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }} // Sử dụng whileInView để chỉ kích hoạt khi trong viewport
          transition={{ duration: 0.8 }}
          viewport={{ once: true }} // Chỉ chạy animation một lần
        >
          <h2 className="text-3xl font-bold text-green-600 md:text-4xl">
            Mang Yêu Thương Vào Từng Sản Phẩm
          </h2>
          <p className="mt-4 text-lg text-gray-700">
            Chúng tôi là nền tảng hỗ trợ những người có hoàn cảnh khó khăn tạo
            ra thu nhập bền vững thông qua việc sản xuất và bán các sản phẩm thủ
            công.
          </p>
        </motion.div>

        <div className="mt-10 grid gap-6 text-center md:grid-cols-3">
          {/* Tạo cơ hội việc làm */}
          <motion.div
            className="rounded-2xl bg-white p-6 shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05 }}
          >
            <h3 className="text-xl font-semibold text-green-700">
              🌱 Cơ Hội Việc Làm
            </h3>
            <p className="mt-2 text-gray-600">
              Giúp người yếu thế có nguồn thu nhập ổn định, vươn lên trong cuộc
              sống.
            </p>
          </motion.div>

          {/* Sản phẩm thủ công chất lượng */}
          <motion.div
            className="rounded-2xl bg-white p-6 shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05 }}
          >
            <h3 className="text-xl font-semibold text-green-700">
              🛍️ Sản Phẩm Độc Đáo
            </h3>
            <p className="mt-2 text-gray-600">
              Mỗi sản phẩm được làm thủ công tỉ mỉ, mang giá trị sáng tạo và tâm
              huyết.
            </p>
          </motion.div>

          {/* Minh bạch và công bằng */}
          <motion.div
            className="rounded-2xl bg-white p-6 shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05 }}
          >
            <h3 className="text-xl font-semibold text-green-700">
              💖 Minh Bạch & Công Bằng
            </h3>
            <p className="mt-2 text-gray-600">
              Lợi nhuận đến trực tiếp với người thợ, giúp họ phát triển bền
              vững.
            </p>
          </motion.div>
        </div>

        <motion.div
          className="mt-10 text-center"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <p className="text-lg text-gray-700">
            Cảm ơn bạn đã ghé thăm! Hãy cùng chúng tôi lan tỏa yêu thương và tạo
            nên sự thay đổi tích cực. 🌿
          </p>
        </motion.div>
      </div>
    </div>
  );
}

export default AboutUsShop;
