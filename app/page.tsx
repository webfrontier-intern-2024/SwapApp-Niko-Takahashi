"use client"; // このプログラムは、ブラウザ側で動作する

import { useState } from 'react';
import Image from "next/image";
import Link from 'next/link';

export default function Home() {
  const [imageSrc, setImageSrc] = useState<string | null>(null); // 画像のURLを保持するステート
  const [isImageSent, setIsImageSent] = useState<boolean>(false); // 画像送信状態を管理するステート

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault(); // 画像ファイルをドロップするとファイルが開かれるかもしれませんが、それを防ぎます。
    const file = event.dataTransfer.files[0]; // ドロップされたファイルを取得

    if (file) {
      const reader = new FileReader(); // 画像ファイルの内容を読み取るための道具
      reader.onloadend = () => {
        setImageSrc(reader.result as string); 
        setIsImageSent(false); // 新しい画像が選ばれたら、状態をリセット
      };
      reader.readAsDataURL(file); // 画像をデータURLとして読み込む
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault(); // デフォルトの動作を防ぐ
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // フォームのデフォルト送信を防ぐ
    console.log("Image sent:", imageSrc);
    setIsImageSent(true); // 画像送信状態を更新
    // ここで画像をサーバーに送信する処理を実装
  };

  const handleDeleteImage = () => {
    setImageSrc(null); // 画像を削除する処理
    setIsImageSent(false); // 画像を削除したら状態をリセット
  };

  return (
    <div className="flex justify-center items-center min-h-screen"> {/* 全体を中央に配置 */}
      <main className="flex flex-col gap-8 items-center"> {/* 子要素を中央に配置 */}
        <div>
          <p className="text-lg font-bold">顔をマスクする</p> {/* タイトルを強調 */}
          <div
            className="border border-gray-400 rounded-lg p-12"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            style={{
              textAlign: "center",
              cursor: "pointer",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              width: "fit-content",
              margin: "0 auto", // 中央揃え
            }}
          >
            {/* ドロップされた画像を表示する部分 */}
            {imageSrc && (
              <div className="mt-4">
                <Image
                  src={imageSrc}
                  alt="Dropped Image"
                  width={300} // 幅
                  height={300} // 高さ
                  className="rounded"
                />
              </div>
            )}
            <p>ここに画像をドラッグ・アンド・ドロップしてください。</p>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="flex gap-4 items-center flex-col sm:flex-row">
          <button
            type="button"
            onClick={handleDeleteImage}
            className="rounded-full border border-solid border-blue-500 dark:border-blue-400 transition-colors flex items-center justify-center hover:bg-blue-100 dark:hover:bg-blue-800 hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
          >
            画像を削除
          </button>
          {isImageSent ? ( // 送信状態によってボタンを切り替える
            <Link href="/Page2">
              <button
                type="button" // ボタンのタイプを変更
                className="rounded-full border border-solid border-blue-500 dark:border-blue-400 transition-colors flex items-center justify-center hover:bg-blue-100 dark:hover:bg-blue-800 hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
              >
                画像をマスク
              </button>
            </Link>
          ) : (
            <button
              type="submit" // 送信ボタン
              className="rounded-full border border-solid border-blue-500 dark:border-blue-400 transition-colors flex items-center justify-center hover:bg-blue-100 dark:hover:bg-blue-800 hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
            >
              画像を送信
            </button>
          )}
        </form>
      </main>
    </div>
  );
}
