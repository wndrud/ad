with open("c:/Users/82108/IdeaProjects/ad/frontend/src/App.jsx", "r", encoding="utf-8") as f:
    content = f.read()

target = """    2: {
      title: "パフォーマンス広告",
      tag: "DCO · ROAS",
      desc: "リアルタイムのデータフィードとターゲットのコホート分析により、クリエイティブの効果を最大化します。機械学習がリアルタイムで最適な組み合わせを生成します。",
      metrics: [
        { label: "平均CTR上昇", val: "+45% 向上" },
        { label: "広告費用対効果", val: "平均 380% ROAS" },
        { label: "DCOパターン数", val: "100以上のレイアウト" }
      ],
      cases: [
        { title: "ファッションEC C社", desc: "ユーザーの関心タグとコピーをリアルタイムでマッチングし、ROAS 410%を突破。" },
        { title: "フィンテックアプリ D社", desc: "マルチバリアントテストの最適化により、顧客獲得単価（CPA）を30%削減。" }
      ],
      features: [
        { title: "広告メッセージ", desc: "ターゲット分析を通じて、購買を促す直感的なメッセージを設計します。" },
        { title: "合理的な価格", desc: "DCO最適化により、効率的に素材を多様化し、広告効率を最大化します。" },
        { title: "直感的な演出", desc: "リアルタイム指標を組み合わせ、ユーザーのクリックを即座に誘発します。" }
      ],
      media: [
        { type: "video", aspectRatio: "16/9", title: "動적A/Bテストクリエイティブ A (16:9)", url: "https://assets.mixkit.co/videos/preview/mixkit-spinning-vinyl-record-player-close-up-42861-large.mp4" },
        { type: "video", aspectRatio: "9/16", title: "動적A/Bテストクリエイティブ B (9:16) [回転試案]", url: "https://assets.mixkit.co/videos/preview/mixkit-tech-device-screen-close-up-41584-large.mp4" }
      ]
    },"""

# Let's also check if it contains the "動的" version in case the file has that.
target2 = """    2: {
      title: "パフォーマンス広告",
      tag: "DCO · ROAS",
      desc: "リアルタイムのデータフィードとターゲットのコホート分析により、クリエイティブの効果を最大化します。機械学習がリアルタイムで最適な組み合わせを生成します。",
      metrics: [
        { label: "平均CTR上昇", val: "+45% 向上" },
        { label: "広告費用対効果", val: "平均 380% ROAS" },
        { label: "DCOパターン数", val: "100以上のレイアウト" }
      ],
      cases: [
        { title: "ファッションEC C社", desc: "ユーザーの関心タグとコピーをリアルタイムでマッチングし、ROAS 410%を突破。" },
        { title: "フィンテックアプリ D社", desc: "マルチバリアントテストの最適化により、顧客获得单价（CPA）を30%削減。" }
      ],
      features: [
        { title: "広告メッセージ", desc: "ターゲット分析を通じて、購買を促す直感的なメッセージを設計します。" },
        { title: "合理的な価格", desc: "DCO最適化により、効率的に素材を多様化し、広告効率を最大化します。" },
        { title: "直感的な演出", desc: "リアルタイム指標を組み合わせ、ユーザーのクリックを即座に誘発します。" }
      ],
      media: [
        { type: "video", aspectRatio: "16/9", title: "動的A/Bテストクリエイティブ A (16:9)", url: "https://assets.mixkit.co/videos/preview/mixkit-spinning-vinyl-record-player-close-up-42861-large.mp4" },
        { type: "video", aspectRatio: "9/16", title: "動的A/Bテストクリエイティブ B (9:16) [回転試案]", url: "https://assets.mixkit.co/videos/preview/mixkit-tech-device-screen-close-up-41584-large.mp4" }
      ]
    },"""

replacement = """    2: {
      title: "イベント・展示会プロモーション",
      tag: "EVENT · FESTIVAL",
      desc: "博覧会、フェスティバル、ブランドのポップアップストア、展示会など、多様なオフライン・オンラインイベントのための最適なプロモーション動画を制作します。感性豊かな映像美と明確な情報伝達で、チケット予約率と来場者のエンゲージメントを極大化します。",
      metrics: [
        { label: "予約・登録率", val: "+58% 向上" },
        { label: "ソーシャル拡散指数", val: "2.5倍 増加" },
        { label: "累計プロモーション実績", val: "500回 以上" }
      ],
      cases: [
        { title: "グローバルアートフェスティバル K社", desc: "アーリーバードチケット完売、および現地来場者数を前年比45%増加達成。" },
        { title: "ITカンファレンス＆展示会 M社", desc: "事前登録目標を120%超過達成し、ビジネスビジネスマッチングの誘導に成功。" }
      ],
      features: [
        { title: "重要情報を明確に", desc: "日時、場所、ラインナップなどの必須情報とイベントコンセプトを直感的にデザインして表示します。" },
        { title: "目を引く映像演出", desc: "壮大なスケールとトレンド感のある編集技術を活用し、イベントの熱気とムードをエモーショナルに再現します。" },
        { title: "行動を促す強力なCTA", desc: "アーリーバード終了、限定チケットなど、即時の登録やチケット購入を促進する誘導演出を挿入します。" }
      ],
      media: [
        { type: "video", aspectRatio: "16/9", title: "イベントハイライトプロモーション試案 (16:9)", url: "https://assets.mixkit.co/videos/preview/mixkit-spinning-vinyl-record-player-close-up-42861-large.mp4" },
        { type: "video", aspectRatio: "9/16", title: "Instagramリール専用ショート試案 (9:16) [回転試案]", url: "https://assets.mixkit.co/videos/preview/mixkit-tech-device-screen-close-up-41584-large.mp4" }
      ]
    },"""

# Normalize newlines
content_norm = content.replace("\r\n", "\n")
target_norm = target.replace("\r\n", "\n")
target2_norm = target2.replace("\r\n", "\n")
replacement_norm = replacement.replace("\r\n", "\n")

if target_norm in content_norm:
    content_norm = content_norm.replace(target_norm, replacement_norm)
    print("Matched and replaced target 1")
elif target2_norm in content_norm:
    content_norm = content_norm.replace(target2_norm, replacement_norm)
    print("Matched and replaced target 2")
else:
    # Try finding the start of the block and replacing until the end of the block
    start_str = '    2: {\n      title: "パフォーマンス広告"'
    if start_str in content_norm:
        idx = content_norm.find(start_str)
        end_idx = content_norm.find('    },', idx)
        if end_idx != -1:
            end_idx += len('    },')
            content_norm = content_norm[:idx] + replacement_norm + content_norm[end_idx:]
            print("Matched via start_str and replaced")
        else:
            print("Failed to find end of block")
    else:
        print("Failed to find start_str")

# Preserve carriage returns if original had them
if "\r\n" in content:
    content_norm = content_norm.replace("\n", "\r\n")

with open("c:/Users/82108/IdeaProjects/ad/frontend/src/App.jsx", "w", encoding="utf-8") as f:
    f.write(content_norm)
