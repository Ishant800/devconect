const RightSidebar = () => (
<aside className="hidden xl:block xl:w-80 p-4 pt-20 fixed top-0 right-0 h-screen bg-white">
<div className="space-y-6">
<div className="rounded-2xl bg-gradient-to-r from-blue-50 to-white p-4 shadow-sm">
<h4 className="font-semibold">Suggestions for you</h4>
<div className="mt-3 space-y-3">
<div className="flex items-center justify-between">
<div className="flex items-center gap-3">
<div className="w-10 h-10 bg-gray-200 rounded-full" />
<div>
<div className="font-medium">dev_maya</div>
<div className="text-xs text-gray-400">React • Node</div>
</div>
</div>
<button className="text-sm text-blue-600 font-medium">Follow</button>
</div>
</div>
</div>


<div className="rounded-2xl bg-white p-4 shadow-sm">
<h4 className="font-semibold">Trending tags</h4>
<div className="mt-3 flex flex-wrap gap-2">
{['react','spring','graphql','design'].map(tag => (
<span key={tag} className="text-xs bg-gray-100 px-3 py-1 rounded-full">#{tag}</span>
))}
</div>
</div>


<div className="rounded-2xl bg-white p-4 shadow-sm">
<h4 className="font-semibold">Tips</h4>
<p className="text-sm text-gray-500 mt-2">Add your projects and link to Github. Keep descriptions short and clear.</p>
</div>
</div>
</aside>
);

export default RightSidebar;