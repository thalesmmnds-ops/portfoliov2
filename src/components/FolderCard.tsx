import { ImagesBadge } from "./ui/images-badge";

export default function FolderCard({
  title,
  previewImages,
  live,
}: {
  title: string;
  previewImages: string[];
  live: boolean;
}) {
  return (
    <div className="relative flex flex-col items-center px-6 pb-6 pt-16">
      {!live && (
        <span className="absolute right-4 top-4 rounded-full bg-zinc-100 px-2.5 py-1 text-[10px] font-mono uppercase tracking-wide text-zinc-500">
          Soon
        </span>
      )}

      <ImagesBadge
        images={previewImages}
        folderSize={{ width: 96, height: 72 }}
        teaserImageSize={{ width: 56, height: 40 }}
        hoverImageSize={{ width: 180, height: 130 }}
        hoverTranslateY={-95}
        hoverSpread={58}
        hoverRotation={14}
      />

      <p className="mt-8 max-w-[11rem] text-center font-mono text-base font-medium text-zinc-900">
        {title}
      </p>
    </div>
  );
}
