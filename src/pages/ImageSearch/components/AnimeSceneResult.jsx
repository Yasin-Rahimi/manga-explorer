import { FaVideo, FaClock, FaExternalLinkAlt, FaSpinner } from "react-icons/fa";
import { Link } from "react-router";

export default function AnimeSceneResult({ result, animeDetails, loadingDetails, mangaLinks }) {
	
	if (!result || result.length === 0) {
		return (
			<div className="mt-4 p-4 bg-gray-800/50 border border-gray-700 rounded-lg text-center text-gray-400">
				No matching scene found.
			</div>
		);
	}

	return (

		<div className="mt-5 space-y-4">

			{result.slice(0, 3).map((match, idx) => {

				const details = animeDetails[match.anilist];
				const isLoadingDetail = loadingDetails[match.anilist];
				const mangaLink = mangaLinks?.[match.anilist];

				const startMin = Math.floor(match.from / 60);
				const startSec = Math.floor(match.from % 60).toString().padStart(2, '0');
				const endMin = Math.floor(match.to / 60);
				const endSec = Math.floor(match.to % 60).toString().padStart(2, '0');
				const timeRange = `${startMin}:${startSec} - ${endMin}:${endSec}`;

				const title = details?.title?.english || details?.title?.romaji || "Unknown";

				const linkComponent = isLoadingDetail ? (
					<span className="text-gray-400">{title}</span>
				) : mangaLink?.found ? (

					<Link
						to={mangaLink.url}
						className="text-white font-bold text-base hover:text-purple-300 transition flex items-center gap-1"
					>
						{title}
						<FaExternalLinkAlt className="w-3 h-3 text-gray-400" />
					</Link>

				) : details?.siteUrl ? (

					<a
						href={details.siteUrl}
						target="_blank"
						rel="noopener noreferrer"
						className="text-white font-bold text-base hover:text-purple-300 transition flex items-center gap-1"
					>
						{title}
						<FaExternalLinkAlt className="w-3 h-3 text-gray-400" />
					</a>

				) : (
					<span className="text-gray-400">{title}</span>
				);

				return (

					<div
						key={idx}
						className="bg-gray-800/70 border border-purple-500/30 rounded-xl p-4"
					>

						<div className="flex flex-col sm:flex-row gap-4">
							
							<div className="w-full sm:w-48 shrink-0">
								<img
									src={match.image}
									alt="Scene preview"
									className="w-full h-auto rounded-lg border border-white/10"
									loading="lazy"
								/>
							</div>

							<div className="flex-1 space-y-3 text-sm">
								
								{isLoadingDetail ? (

									<div className="flex items-center gap-2 text-gray-400">
										<FaSpinner className="animate-spin" />
										Loading anime info...
									</div>

								) : details ? (

									<div className="flex items-start gap-3">
										
										<img
											src={details.coverImage?.large}
											alt={title}
											className="w-12 h-16 object-cover rounded border border-white/10 shrink-0"
										/>
										
										<div>
											{linkComponent}
										</div>

									</div>

								) : (

									<div className="text-gray-400 text-sm">
										Anime info not available
									</div>

								)}

								<div className="flex flex-wrap gap-x-4 gap-y-1 text-gray-300">
									
									<div className="flex items-center gap-1">
										<FaClock className="text-gray-400" />
										<span>Episode: {match.episode ?? "Unknown"}</span>
									</div>

									<div className="flex items-center gap-1">
										<FaClock className="text-gray-400" />
										<span>Scene: {timeRange}</span>
									</div>

									<div className="flex items-center gap-1">
										<span className="text-green-400 font-semibold">
											{(match.similarity * 100).toFixed(1)}% match
										</span>
									</div>

								</div>

								{match.video && (
									<a
										href={match.video}
										target="_blank"
										rel="noopener noreferrer"
										className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600/50 hover:bg-purple-600 rounded-lg transition text-white text-sm"
									>
										<FaVideo />
										Watch Clip
									</a>
								)}

							</div>
							
						</div>

					</div>
				);
			})}

		</div>

	);
}
