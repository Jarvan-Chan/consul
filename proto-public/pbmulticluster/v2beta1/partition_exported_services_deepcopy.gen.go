// Code generated by protoc-gen-deepcopy. DO NOT EDIT.
package multiclusterv2beta1

import (
	proto "google.golang.org/protobuf/proto"
)

// DeepCopyInto supports using PartitionExportedServices within kubernetes types, where deepcopy-gen is used.
func (in *PartitionExportedServices) DeepCopyInto(out *PartitionExportedServices) {
	proto.Reset(out)
	proto.Merge(out, proto.Clone(in))
}

// DeepCopy is an autogenerated deepcopy function, copying the receiver, creating a new PartitionExportedServices. Required by controller-gen.
func (in *PartitionExportedServices) DeepCopy() *PartitionExportedServices {
	if in == nil {
		return nil
	}
	out := new(PartitionExportedServices)
	in.DeepCopyInto(out)
	return out
}

// DeepCopyInterface is an autogenerated deepcopy function, copying the receiver, creating a new PartitionExportedServices. Required by controller-gen.
func (in *PartitionExportedServices) DeepCopyInterface() interface{} {
	return in.DeepCopy()
}
